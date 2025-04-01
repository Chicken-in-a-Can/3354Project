class User:
    def __init__(self, email, password):
        self.__email = email
        self.__password = password
        self.__ingredients = []
        self.__recipes = []

    def get_email(self):
        return self.__email

    def set_email(self, new_email):
        self.__email = new_email

    def verify_password(self, password):
        return self.__password == password

    def add_ingredient(self, ingredient):
        self.__ingredients.append(ingredient)

    def get_ingredients(self):
        return self.__ingredients.copy()

    def add_recipe(self, recipe):
        self.__recipes.append(recipe)

    def get_recipes(self):
        return self.__recipes.copy()
    
class Ingredient:
    def __init__(self, name, quantity, unit):
        self.__name = name
        #self.__type = type  #maybe we need it? -> dairy/carb/protein??
        #maybe also add in a list, that matches an ingredient to each recipe involved, but this would be difficult as we would need static types
        #do we want an ingredient class?
        self.__quantity = quantity #decided to just implement by adding quantity in each individual ingredient, so user can have a list of ingredients instead of map of ingredient:quantity
        self.__unit = unit #also units for  how we measure quantity(cup, lb, g, etc.)

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name
    
    def set_quantity(self, quantity):
        self.__quantity = quantity

    def get_type(self):
        return self.__quantity
    
    def set_unit(self, unit):
        self.__unit = unit

    def get_unit(self):
        return self.__unit


class Recipe:
    def __init__(self, title, instructions=""):
        self.__title = title
        self.__ingredients = []  #what ingredients do we have
        self.__instructions = instructions #instructions for user, default to empty

    def add_ingredient(self, ingredient):
        self.__ingredients.append(ingredient)

    def get_title(self):
        return self.__title
    
    def set_title(self, title):
        self.__title = title

    def get_ingredients(self):
        return self.__ingredients.copy()
    
    def set_ingredients(self, ingredients):
        self.__ingredients = ingredients

    def get_instructions(self):
        return self.__instructions
    
    def set_instructions(self, instructions):
        self.__instructions = instructions


