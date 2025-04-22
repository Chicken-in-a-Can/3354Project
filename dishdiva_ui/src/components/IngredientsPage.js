import React from "react";
import Header from "./Header";
import "./styles.css";

const Ingredients = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="ingredients-title">Ingredients</div>
        <a href="/updateIngredients">
          <button className="update-button">Update Ingredients</button>
        </a>
        <div className="ingredient-row">Chicken - 1 lb</div>
        <div className="ingredient-row">Flour - 2 cups</div>
        <div className="ingredient-row">Salt - 1 tsp</div>
      </div>
    </div>
  );
};

export default Ingredients;
