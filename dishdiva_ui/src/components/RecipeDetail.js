import React from "react";

const RecipeDetail = ({ onBack }) => (
  <div className="page-container">
    <button onClick={onBack} className="back-button">← Back to Recipes</button>

    <div className="recipe-detail-layout">
      <div className="recipe-info">
        <h2>Recipe Name Placeholder</h2>
        <p>Category: Healthy</p>
        <p>Instructions: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet ligula eget sapien laoreet pulvinar.</p>
      </div>

      <div className="recipe-image">
        <div className="img-placeholder-large"></div>
      </div>
    </div>
  </div>
);

export default RecipeDetail;
