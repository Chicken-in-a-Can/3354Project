import React from "react";

const RecipeCard = ({ onClick }) => (
  <div className="recipe-card" onClick={onClick}>
    <div className="img-placeholder"></div>
    <div className="text-line wide"></div>
    <div className="text-line narrow"></div>
  </div>
);

export default RecipeCard;
