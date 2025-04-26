import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import "../App.css";

const RecipePage = ({ onNavigateToDetail }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/calls/recipes/") // Ensure this matches your backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRecipes(data.results || [])) // Ensure results exist
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      });
  }, []);

  return (
    <div className="page-container">
      <h1>Recipes</h1>
      {error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              name={recipe.name}
              category={recipe.category}
              onClick={() => onNavigateToDetail(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <p>No recipes available. Please check back later.</p>
      )}
    </div>
  );
};

export default RecipePage;