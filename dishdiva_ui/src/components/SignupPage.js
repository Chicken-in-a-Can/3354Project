import React, { useState } from "react";
import "../App.css";

const SignupPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { username, email, password, confirmPassword } = formData;
  
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    fetch("http://localhost:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Failed to sign up.");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(data.message);
        setError(null);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message || "An unexpected error occurred.");
        setSuccess(null);
      });
  };

  return (
    <div className="auth-page">
      <h2>Create Your DishDiva Account</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <input
        className="auth-input"
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="auth-input"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="auth-input"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        className="auth-input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button className="auth-button" onClick={handleSubmit}>
        Sign Up
      </button>
      <button className="auth-link" onClick={onSwitch}>
        Already have an account? Login
      </button>
    </div>
  );
};

export default SignupPage;