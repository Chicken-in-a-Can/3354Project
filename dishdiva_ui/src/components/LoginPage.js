import React from "react";
import "../App.css";

const LoginPage = ({ onSwitch }) => (
  <div className="auth-page">
    <h2>Login to DishDiva</h2>
    <input className="auth-input" type="email" placeholder="Email" />
    <input className="auth-input" type="password" placeholder="Password" />
    <button className="auth-button">Login</button>
    <button className="auth-link" onClick={onSwitch}>
      Don’t have an account? Sign up
    </button>
  </div>
);

export default LoginPage;
