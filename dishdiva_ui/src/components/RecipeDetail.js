import React, { useEffect, useState } from "react";

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/calls/recipe/${recipeId}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Failed to fetch recipe", err));
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

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