import React, { useState } from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import ProfilePage from "./components/ProfilePage";
import RecipesPage from "./components/RecipePage";


const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    if (selectedRecipe) return <RecipeDetail onBack={() => setSelectedRecipe(null)} />;
    //if (activePage === "ingredients") return <IngredientsPage />;
    if (activePage === "profile") return <ProfilePage />;
    if (activePage === "recipes") return <RecipesPage onRecipeSelect={() => setSelectedRecipe(true)} />;
    return <HomePage onRecipeSelect={() => setSelectedRecipe(true)} />;
  };

  return (
    <div>
      <NavigationBar onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
};



export default App;