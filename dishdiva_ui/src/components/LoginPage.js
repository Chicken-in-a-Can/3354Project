import React, { useState } from "react";
import "../App.css";

const LoginPage = ({ onSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          alert("Login successful!");
          // TODO: Redirect to homepage or set logged-in user
        } else {
          alert("Login failed: " + data.message);
        }
      })
      .catch((err) => console.error("Login error:", err));
  };

  return (
    <div className="auth-page">
      <h2>Login to DishDiva</h2>
      <input
        className="auth-input"
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" onClick={handleLogin}>
        Login
      </button>
      <button className="auth-link" onClick={onSwitch}>
        Don't have an account? Sign up
      </button>
    </div>
  );
};

export default LoginPage;
