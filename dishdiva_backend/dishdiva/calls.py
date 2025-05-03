
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
import json
import base64
from . import classes
from . import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from .models import Recipe
from .models import Ingredient



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
    recipes = Recipe.objects.all()
    recipe_list = [
        {
            "id": recipe.id,
            "name": recipe.name,
            "category": recipe.category,
            "ingredients": [ingredient.ingredient.name for ingredient in recipe.ingredients.all()],  # Ensure this is returned correctly
        }
        for recipe in recipes
    ]
    return JsonResponse({"results": recipe_list}, status=200)

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
    



def get_user(request, user_id):
    """
    Fetch user data by ID.
    """
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({
            "username": user.username,
        }, status=200)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)


@csrf_exempt
def update_profile(request):
    """
    Handle profile updates (name and profile picture).
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")  # Pass the logged-in user's ID
            new_name = data.get("name")
            profile_picture = data.get("profile_picture")  # Base64 encoded image

            # Validate input
            if not user_id or not new_name:
                return JsonResponse({"error": "User ID and name are required."}, status=400)

            # Get the user
            user = User.objects.get(id=user_id)

            # Update the user's name
            user.username = new_name

            # Update the profile picture if provided
            if profile_picture:
                format, imgstr = profile_picture.split(";base64,")
                ext = format.split("/")[-1]  # Get the file extension
                if ext not in ["png", "jpg", "jpeg"]:  # Validate file type
                    return JsonResponse({"error": "Invalid file type."}, status=400)
                user.profile_picture.save(f"profile_{user.id}.{ext}", ContentFile(base64.b64decode(imgstr)))

            user.save()
            return JsonResponse({"message": "Profile updated successfully."}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def add_recipe(request):
    if request.method == "POST":
        try:
            # Parse the request body
            data = json.loads(request.body)
            name = data.get("name")
            category_name = data.get("category")
            ingredient_names = data.get("ingredients", [])

            # Validate the input
            if not name or not category_name or not ingredient_names:
                return JsonResponse({"error": "Name, category, and ingredients are required."}, status=400)

            # Map category names to codes
            category_map = {
                "Generic": "N",
                "Healthy": "H",
                "Vegetarian": "VG",
                "Vegan": "V",
                "GlutenFree": "GF",
            }

            category_code = category_map.get(category_name)

            if not category_code:
                return JsonResponse({"error": "Invalid category."}, status=400)

            # Create the recipe
            recipe = Recipe.objects.create(name=name, category=category_code, instructions="")

            # Add ingredients to the recipe (without linking to the user's general ingredients)
            for ing_name in ingredient_names:
                # Create a new ingredient for the recipe only
                ingredient_relation = models.Ingredients.objects.create(
                    ingredient=models.Ingredient.objects.create(
                        name=ing_name,
                        quantity="1 unit",  # Default quantity for the recipe
                        nutrition=models.Nutrition.objects.create(calories=0, sugars=0, carbs=0, protein=0),
                    ),
                    quantity=1.0  # Default quantity for the recipe
                )
                recipe.ingredients.add(ingredient_relation)

            # Return the created recipe
            return JsonResponse({
                "id": recipe.id,
                "name": recipe.name,
                "category": category_name,
                "ingredients": [ing.ingredient.name for ing in recipe.ingredients.all()],
            }, status=201)

        except Exception as e:
            # Log the error for debugging
            print(f"Error adding recipe: {e}")
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)

@login_required
def get_ingredients(request):
    ingredients = Ingredient.objects.filter(user=request.user)
    data = [{"name": ing.name, "quantity": ing.quantity} for ing in ingredients]
    return JsonResponse(data, safe=False)

@csrf_exempt
@login_required
def add_ingredient(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ingredient = Ingredient.objects.create(
            user=request.user,
            name=data["name"],
            quantity=data["quantity"],
        )
        return JsonResponse({"name": ingredient.name, "quantity": ingredient.quantity})