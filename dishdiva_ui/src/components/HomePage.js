import React from "react";
import RecipeCard from "./RecipeCard";

const HomePage = ({ onRecipeSelect }) => (
  <div className="home-page">

    <div className="section">
      <div className="section-header">
        <h2>Recommended/Featured</h2>
        <button className="view-more-link">View More Recipes</button>
      </div>
      <div className="grid-row">
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
      </div>
    </div>

    <div className="section">
      <div className="text-line full"></div>
      <div className="text-line wide"></div>
    </div>
  </div>
);

export default HomePage;
