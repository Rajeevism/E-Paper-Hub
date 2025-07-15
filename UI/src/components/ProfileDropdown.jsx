import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import "../styles/ProfileDropdown.css";

// --- FIX: Accept the onClose prop ---
const ProfileDropdown = ({ onClose }) => {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        onClose(); // --- FIX: Close the dropdown on successful logout
      })
      .catch((err) => console.error(err));
  };

  // This check prevents errors if the component somehow renders without a user
  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-dropdown">
      <div className="dropdown-header">
        {/* --- FIX: This is where we display the user's name --- */}
        <p className="dropdown-greeting">
          Hello, {currentUser.displayName || "User"}
        </p>
        <span className="dropdown-email">{currentUser.email}</span>
      </div>
      <hr />
      <div className="dropdown-section">
        {/* You can add more links here later */}
        <a href="/profile" className="dropdown-item">
          My Profile
        </a>
        <a href="/orders" className="dropdown-item">
          My Orders
        </a>
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
