// UI/src/components/ProfileDropdown.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import "../styles/ProfileDropdown.css"; // We'll create this CSS

const ProfileDropdown = () => {
  const { currentUser } = useAuth();
  const handleLogout = () => {
    signOut(auth).catch((err) => console.error(err));
  };

  return (
    <div className="profile-dropdown">
      <div className="dropdown-header">
        <img
          src={currentUser.photoURL || "default-avatar.png"}
          alt="Profile"
          className="dropdown-avatar"
        />
        <p>Hello, {currentUser.displayName || "User"}</p>
      </div>
      <hr />
      <div className="dropdown-section">
        <h4>Theme</h4>
        <ThemeSwitcher />
      </div>
      <hr />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};
export default ProfileDropdown;
