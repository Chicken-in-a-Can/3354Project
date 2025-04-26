import React, { useState, useEffect } from "react";

const ProfilePage = ({ onLogout, userId }) => {
  const [username, setUsername] = useState(""); // Store the logged-in user's username
  const [error, setError] = useState(null); // Error message for fetching user data

  // Fetch user data from the backend
  useEffect(() => {
    fetch(`http://localhost:8000/get_user/${userId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username); // Set the username from the backend response
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      });
  }, [userId]);

  return (
    <div className="home-page" style={{ textAlign: "center" }}>
      <div className="text-line wide" style={{ margin: "1rem auto" }}>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <h2>Welcome, {username}!</h2> // Display the logged-in user's username
        )}
      </div>
      <br />
      <button onClick={onLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;