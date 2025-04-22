import React from "react";
import "../App.css";

const Ingredients = ({ onNavigate }) => {
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
        <div className="ingredient-row">Chicken - 1 lb</div>
        <div className="ingredient-row">Flour - 2 cups</div>
        <div className="ingredient-row">Salt - 1 tsp</div>
      </div>
    </div>
  );
};

export default Ingredients;
