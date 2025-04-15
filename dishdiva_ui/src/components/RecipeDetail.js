import React from "react";

const RecipeDetail = ({ onBack }) => (
  <div className="recipe-detail">
    <button onClick={onBack} style={{ marginBottom: "1rem" }}>← Back to Recipes</button>
    <div className="recipe-info">
      <div className="text-line wide"></div>
      <div className="text-line narrow"></div>
      <div className="text-line full"></div>
      <div className="text-line wide"></div>
      <div className="text-line full"></div>
    </div>
    <div className="recipe-image-large">
      <div className="img-placeholder"></div>
    </div>
  </div>
);

export default RecipeDetail;
