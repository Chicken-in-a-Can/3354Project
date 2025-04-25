import React, { useEffect, useState } from "react";
import "../App.css";

const Ingredients = ({ onNavigate }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/ingredients/")
      .then(response => response.json())
      .then(data => setIngredients(data))
      .catch(error => console.error("Error fetching ingredients:", error));
  }, []);

  return (
    <div>
      <div className="main">
        <div className="ingredients-title">Ingredients</div>
        <button
          className="update-button"
          onClick={() => onNavigate("update-ingredients")}
        >
          Update Ingredients
        </button>
        {ingredients.map((ingredient, index) => (
          <div className="ingredient-row" key={index}>
            {ingredient.name} - {ingredient.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
