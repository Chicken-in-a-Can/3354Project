from django.http import HttpResponse, JsonResponse

from . import classes


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
    response = "results: %s"
    return HttpResponse(response % search_request)

def getUserFromDb(request, search_request):
    response = "results: %s"
    return HttpResponse(response % search_request)

def login(login, pass):
    pass
