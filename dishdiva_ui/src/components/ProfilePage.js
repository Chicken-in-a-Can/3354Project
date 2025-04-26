import React from "react";

const ProfilePage = ({ onLogout }) => {
  return (
    <div className="home-page" style={{ textAlign: "center" }}>
      <button onClick={onLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;