
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import classes
from . import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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

def all_recipes(request):
    """
    Fetch all recipes from the database and return them as a JSON response.
    """
    recipes = models.Recipe.objects.all()
    results = []
    for r in recipes:
        results.append({
            "id": r.id,
            "name": r.name,
            "category": r.category,
            "instructions": r.instructions,  # Include instructions if needed
            "ingredients": [ingredient.name for ingredient in r.ingredients.all()],  # Include related ingredients
        })
    return JsonResponse({"results": results})

def recipe(request, recipe_id):
    """
    Fetch a single recipe by its ID and return its details as a JSON response.
    """
    try:
        # Fetch the recipe from the database
        recipe = models.Recipe.objects.get(id=recipe_id)
        response = {
            "id": recipe.id,
            "name": recipe.name,
            "category": recipe.category,
            "ingredients": [ingredient.name for ingredient in recipe.ingredients.all()],
            "instructions": recipe.instructions,
        }
        return JsonResponse(response)
    except models.Recipe.DoesNotExist:
        # Return a 404 error if the recipe is not found
        return JsonResponse({"error": "Recipe not found"}, status=404)
    




@csrf_exempt
def signup(request):
    """
    Handle user signup requests.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            # Validate input
            if not username or not email or not password:
                return JsonResponse({"error": "All fields are required."}, status=400)

            # Check if the user already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username is already taken."}, status=400)
            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email is already registered."}, status=400)

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password)

            return JsonResponse({"message": "User registered successfully."}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def login(request):
    """
    Handle user login requests.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Validate input
            if not email or not password:
                return JsonResponse({"message": "Email and password are required."}, status=400)

            # Authenticate user
            user = authenticate(username=email, password=password)
            if user is not None:
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse({"message": "Invalid email or password."}, status=401)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

    return JsonResponse({"message": "Invalid request method."}, status=405)