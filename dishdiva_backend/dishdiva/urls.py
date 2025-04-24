"""
URL configuration for dishdiva project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import calls

urlpatterns = [
    path('admin/', admin.site.urls),
    path("recipe/<str:recipe_id>/", calls.recipe, name = "recipe"),
    path("user/<str:user_id>/", calls.user, name = "user"),
    path("ingredient/<str:ingredient_id>/", calls.ingredient, name = "ingredient"),
    path("search/<str:search_request>/", calls.search, name = "search"),
]
