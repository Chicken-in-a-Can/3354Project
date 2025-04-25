import React from "react";
import "../App.css";

const RecipeCard = ({ onClick, title = "Recipe Name", description = "Quick description here" }) => (
  <div className="recipe-card" onClick={onClick}>
    <div className="img-placeholder"></div>

    <div className="recipe-card-content">
      <h3 className="recipe-title">{title}</h3>
      <p className="recipe-description">{description}</p>
    </div>
  </div>
);

export default RecipeCard;
