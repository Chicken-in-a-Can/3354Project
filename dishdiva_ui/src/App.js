import React, { useState } from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import ProfilePage from "./components/ProfilePage";
import RecipesPage from "./components/RecipePage";
import IngredientsPage from "./components/IngredientsPage";
import UpdateIngredientsPage from "./components/UpdateIngredients";
import AuthController from "./AuthController";



const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const renderPage = () => {
    if (selectedRecipe) return <RecipeDetail onBack={() => setSelectedRecipe(null)} />;

    switch (activePage) {
      case "home":
        return <HomePage onRecipeSelect={() => setSelectedRecipe(true)} />;
      case "recipes":
        return <RecipesPage onRecipeSelect={() => setSelectedRecipe(true)} />;
      case "ingredients":
        return <IngredientsPage onNavigate={setActivePage} />;
      case "update-ingredients":
        return <UpdateIngredientsPage />;
      case "profile":
        return <ProfilePage />;
      case "auth":
        return <AuthController />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <NavigationBar onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
};

export default App;