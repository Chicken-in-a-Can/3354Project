import React from "react";

const ProfilePage = () => (
  <div className="home-page" style={{ textAlign: "center" }}>
    <div className="img-placeholder" style={{ width: 100, height: 100, margin: "0 auto" }}></div>
    <div className="text-line wide" style={{ margin: "1rem auto" }}></div>
    <div className="text-line narrow" style={{ margin: "0 auto" }}></div>
    <br />
    <button>Edit Profile</button>
  </div>
);

export default ProfilePage;
