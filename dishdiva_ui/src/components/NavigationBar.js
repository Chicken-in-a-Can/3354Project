import React from "react";

const NavigationBar = ({ onNavigate }) => (
  <nav className="navbar">
    <div className="nav-left">
      <button className="logo" onClick={() => onNavigate("home")}>DishDiva</button>
    </div>
    <div className="nav-right">
      <button onClick={() => onNavigate("recipes")}>Recipes</button>
      <button onClick={() => onNavigate("ingredients")}>Ingredients</button>
      <button onClick={() => onNavigate("profile")}>Profile</button>
      <button onClick={() => onNavigate("auth")}>Login</button> {/* only one button */}
    </div>
  </nav>
);

export default NavigationBar;
