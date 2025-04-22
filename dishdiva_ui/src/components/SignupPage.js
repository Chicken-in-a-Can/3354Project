import React from "react";
import "../App.css";

const SignupPage = ({ onSwitch }) => (
  <div className="auth-page">
    <h2>Create Your DishDiva Account</h2>
    <input className="auth-input" type="text" placeholder="Username" />
    <input className="auth-input" type="email" placeholder="Email" />
    <input className="auth-input" type="password" placeholder="Password" />
    <input className="auth-input" type="password" placeholder="Confirm Password" />
    <button className="auth-button">Sign Up</button>
    <button className="auth-link" onClick={onSwitch}>
      Already have an account? Login
    </button>
  </div>
);

export default SignupPage;
