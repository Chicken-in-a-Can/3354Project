from django.http import HttpResponse, JsonResponse

from . import classes
from . import models

def recipe(request, recipe_id):
    recipe = classes.Recipe.fetch_recipe(recipe_id)
    response = {
        "name": recipe.get_name(),
        "ingredients": recipe.get_ingredients(),
        "category": recipe.get_category(),
        "instructions": recipe.get_instructions(),
    }
    return JsonResponse(response)


def user(request, user_id):
    response = "You're user %s"
    return HttpResponse(response % user_id)


def ingredient(request, ingredient_id):
    ingredient = classes.Ingredient.fetch_ingredient(ingredient_id)
    response = {
        "name": ingredient.get_name(),
        "nutrition": ingredient.get_nutrition(),
        "unit": ingredient.get_unit(),
    }
    return JsonResponse(response)


def searchRecipe(request, search_request):
    recipes = models.Recipe.objects.filter(name__icontains=search_request)
    results = []
    for recipe in recipes:
        results.append({
            "name": recipe.name,
            "category": recipe.category,
            "instructions": recipe.instructions,
        })
    return JsonResponse({"results": results})

def getUserFromDb(request, search_request):
    users = models.User.objects.filter(name__icontains=search_request)
    results = []
    for user in users:
        results.append({
            "name": user.name,
            "email": user.email,
        })
    return JsonResponse({"results": results})

def login(request):
    identifier = request.GET.get('email')
    password = request.GET.get('password')

    if not identifier or not password:
        return JsonResponse({"error": "Missing email or password"}, status=400)

    auth_system = classes.AuthSystem()
    if auth_system.login(identifier, password):
        return JsonResponse({"message": "Login successful"})
    else:
        return JsonResponse({"message": "Invalid credentials"}, status=401)
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def ingredients_list(request):
    if request.method == "GET":
        ingredients = models.Ingredient.objects.all()
        results = [
            {
                "id": ing.id,
                "name": ing.name,
                "quantity": ing.quantity,
                "nutrition": {
                    "calories": ing.nutrition.calories,
                    "sugars": ing.nutrition.sugars,
                    "carbs": ing.nutrition.carbs,
                    "protein": ing.nutrition.protein,
                }
            } for ing in ingredients
        ]
        return JsonResponse(results, safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)
        nutrition = models.Nutrition.objects.create(
            calories=data["nutrition"]["calories"],
            sugars=data["nutrition"]["sugars"],
            carbs=data["nutrition"]["carbs"],
            protein=data["nutrition"]["protein"]
        )
        ingredient = models.Ingredient.objects.create(
            name=data["name"],
            quantity=data["quantity"],
            nutrition=nutrition
        )
        return JsonResponse({"id": ingredient.id, "message": "Ingredient created"})
