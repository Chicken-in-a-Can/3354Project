import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import "../App.css";

const RecipesPage = ({ onRecipeSelect }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ name: "", category: "", ingredients: [], instructions: "" });
  const [ingredientInput, setIngredientInput] = useState(""); 
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/calls/recipes/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRecipes(data.results || []))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      });
  }, []);

  const handleAddRecipe = (e) => {
    e.preventDefault();

    if (!newRecipe.name || !newRecipe.category || newRecipe.ingredients.length === 0 || !newRecipe.instructions.trim()) {
      setAddError("All fields (name, category, ingredients, and instructions) are required.");
      return;
    }

    fetch("http://localhost:8000/calls/add_recipe/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add recipe.");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes((prevRecipes) => [...prevRecipes, data]);
        setNewRecipe({ name: "", category: "", ingredients: [], instructions: "" });
        setIngredientInput(""); 
        setAddError(null);
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        setAddError("Failed to add recipe. Please try again later.");
      });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() === "") return;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ingredientInput.trim()],
    }));
    setIngredientInput(""); 
  };

  const handleRemoveIngredient = (index) => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="page-container">
      <h1>Recipes</h1>

      <div className="add-recipe-form">
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleAddRecipe}>
          <input
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            style={{ padding: "0.5rem" }}
          />
          <select
            value={newRecipe.category}
            onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
            style={{ padding: "0.5rem" }}
          >
            <option value="">Select Category</option>
            <option value="Generic">Generic</option>
            <option value="Healthy">Healthy</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="GlutenFree">GlutenFree</option>
            <option value="HighProtein">HighProtein</option>
            <option value="LowCarb">LowCarb</option>
            <option value="Keto">Keto</option>
            <option value="Paleo">Paleo</option>
          </select>

          <div>
            <input
              type="text"
              placeholder="Add Ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              style={{ padding: "0.5rem" }}
            />
            <button type="button" onClick={handleAddIngredient} style={{ padding: "0.5rem" }}>
              Add Ingredient
            </button>
          </div>

          <ul>
            {newRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
                <button type="button" onClick={() => handleRemoveIngredient(index)} style={{ marginLeft: "1rem" }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <textarea
            placeholder="Enter instructions here..."
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          ></textarea>

          <button type="submit" style={{ padding: "0.5rem", marginTop: "1rem" }}>
            Add Recipe
          </button>
        </form>
        {addError && <p style={{ color: "red" }}>{addError}</p>}
      </div>

      {error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => onRecipeSelect(recipe)} />
          ))}
        </div>
      ) : (
        <p>No recipes available. Please check back later.</p>
      )}
    </div>
  );
};

export default RecipesPage;
