import React from "react";
import RecipeCard from "./RecipeCard";

const RecipesPage = ({ onRecipeSelect }) => (
  <div className="home-page">
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search recipes..."
      />
      <button className="search-button">Search</button>
    </div>

    <div className="section">
      <div className="section-header">
        <h2>Cuisine</h2>
        <button>View More Recipes</button>
      </div>
      <div className="grid-row">
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
      </div>
    </div>

    <div className="section">
      <div className="section-header">
        <h2>Saved Recipes</h2>
        <button>View More Recipes</button>
      </div>
      <div className="grid-row">
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
        <RecipeCard onClick={onRecipeSelect} />
      </div>
    </div>
  </div>
);

export default RecipesPage;
