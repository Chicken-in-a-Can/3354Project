class User:
    def __init__(self, email, password):
        self.__email = email
        self.__password = password
        self.__ingredients = {}
        self.__recipes = []

    def get_email(self):
        return self.__email

    def set_email(self, new_email):
        self.__email = new_email

    def verify_password(self, password):
        return self.__password == password

    def add_ingredient(self, ingredient, quantity):
        self.__ingredients.append(ingredient)

    def get_ingredients(self):
        return self.__ingredients.copy()

    def save_recipe(self, recipe):
        self.__recipes.append(recipe)

    def upload_recipe(self, recipe):
        # TODO: Upload Recipe
        2

    def get_recipes(self):
        return self.__recipes.copy()

class SiteUser: 
    def __init__(self):
        self.__user = None

    def log_in(self, user, password):
        if user.verify_password(password):
            self.__user = user

    def log_out(self):
        self.__user = None

class Ingredient:
    def __init__(self, name, unit, nutrition):
        self.__name = name
        self.__unit = unit #also units for  how we measure quantity(cup, lb, g, etc.)
        self.__nutrition = nutrition

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name
    
    def set_unit(self, unit):
        self.__unit = unit

    def get_unit(self):
        return self.__unit

class Nutrition:
    def __init__(self, name, calories, sugars, carbs, protein):
        self.__name = name
        self.__calories = calories
        self.__sugars = sugars
        self.__carbs = carbs
        self.__protein = protein

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name

    def set_calories(self, calories):
        self.__calories = calories

    def get_calories(self):
        return self.__calories

    def set_sugars(self, sugars):
        self.__sugars = sugars

    def get_sugars(self):
        return self.__sugars

    def set_carbs(self, carbs):
        self.__carbs = carbs

    def get_carbs(self):
        return self.__carbs

    def set_protein(self, protein):
        self.__protein = protein

    def get_protein(self):
        return self.__protein


class Recipe:
    def __init__(self, title, instructions=""):
        self.__title = title
        self.__ingredients = {}  #what ingredients do we have
        self.__instructions = instructions #instructions for user, default to empty

    def add_ingredient(self, ingredient, quantity):
        self.__ingredients[ingredient] = quantity

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

    def get_nutrition(self):
        nutrition = Nutrition("Total Nutrition", 0, 0, 0, 0)
        for ingredient, quantity in self.__ingredients:
            nutrition.set_calories(nutrition.get_calories() + (ingredient.get_calories() * quantity))
            nutrition.set_sugars(nutrition.get_sugars() + (ingredient.get_sugars() * quantity))
            nutrition.set_carbs(nutrition.get_carbs() + (ingredient.get_carbs() * quantity))
            nutrition.set_protein(nutrition.get_protein() + (ingredient.get_protein() * quantity))

        return nutrition

