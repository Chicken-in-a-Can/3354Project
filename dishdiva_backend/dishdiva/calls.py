
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


from django.views.decorators.csrf import csrf_exempt
from .models import Ingredient

@csrf_exempt
def ingredient(request, ingredient_id):
    if request.method == "DELETE":
        Ingredient.objects.filter(id=ingredient_id).delete()
        return JsonResponse({"message": "Deleted"})

    elif request.method == "PUT":
        data = json.loads(request.body)
        Ingredient.objects.filter(id=ingredient_id).update(
            name=data["name"],
            quantity=data["quantity"]
        )
        return JsonResponse({"message": "Updated"})

    elif request.method == "GET":
        obj = Ingredient.objects.get(id=ingredient_id)
        return JsonResponse({
            "id": obj.id,
            "name": obj.name,
            "quantity": obj.quantity,
        })

    return JsonResponse({"error": "Method not allowed"}, status=405)


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

# def login(request):
    identifier = request.GET.get('email')
    password = request.GET.get('password')

    if not identifier or not password:
        return JsonResponse({"error": "Missing email or password"}, status=400)

    auth_system = classes.AuthSystem()
    if auth_system.login(identifier, password):
        return JsonResponse({"message": "Login successful"})
    else:
        return JsonResponse({"message": "Invalid credentials"}, status=401)
# from django.views.decorators.csrf import csrf_exempt
# import json

from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            identifier = data.get('email')  # or username if you prefer
            password = data.get('password')

            if not identifier or not password:
                return JsonResponse({"error": "Missing email or password"}, status=400)

            auth_system = classes.AuthSystem()
            if auth_system.login(identifier, password):
                return JsonResponse({"message": "Login successful"})
            else:
                return JsonResponse({"message": "Invalid credentials"}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

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
