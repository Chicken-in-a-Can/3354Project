import React, { useState } from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import ProfilePage from "./components/ProfilePage";
import RecipesPage from "./components/RecipePage";
import IngredientsPage from "./components/IngredientsPage";
import UpdateIngredientsPage from "./components/UpdateIngredients";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

const App = () => {
  const [activePage, setActivePage] = useState("auth"); // Default to login page
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActivePage("profile"); // Redirect to profile after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("auth"); // Redirect to login page after logout
  };

  const handleSignupSuccess = () => {
    setActivePage("auth"); // Redirect to login page after successful signup
  };

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
        return <ProfilePage onLogout={handleLogout} />; // Pass logout handler to ProfilePage
      case "auth":
        return (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => setActivePage("signup")} // Switch to signup page
          />
        );
      case "signup":
        return (
          <SignupPage
            onSignupSuccess={handleSignupSuccess} // Redirect to login after signup
            onSwitchToLogin={() => setActivePage("auth")} // Switch to login page
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {isLoggedIn && <NavigationBar isLoggedIn={isLoggedIn} onNavigate={setActivePage} />} {/* Pass isLoggedIn to NavigationBar */}
      {renderPage()}
    </div>
  );
};

export default App;