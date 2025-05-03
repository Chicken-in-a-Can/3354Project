import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/calls/recipes/")
      .then((response) => response.json())
      .then((data) => setRecipes(data.results || []))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes.");
      });
  }, []);

  return (
    <div className="home-page">
      <div className="section">
        <div className="section-header">
          <h2>All Recipes</h2>
        </div>
        {error ? (
          <p>{error}</p>
        ) : recipes.length > 0 ? (
          <div className="grid-row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card" style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem" }}>
                <h3>{recipe.name}</h3>
                <p><strong>Category:</strong> {recipe.category}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
