import React from "react";

const RecipeCard = ({ name, category, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <h2>{name}</h2>
      <p>{category}</p>
    </div>
  );
};

export default RecipeCard;