from django.http import HttpResponse

def index(request):
    return HttpResponse("At DishDiva index")

def recipe(request, recipe_name):
    response = "You're looking at recipe %s"
    return HttpResponse(response % recipe_name)

