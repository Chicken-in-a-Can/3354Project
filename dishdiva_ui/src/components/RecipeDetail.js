import React, { useEffect, useState } from "react";

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/calls/recipe/${recipeId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recipe", err);
        setError("Failed to load recipe. Please try again later.");
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.name}</h1>
      <h3>Category: {recipe.category}</h3>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;