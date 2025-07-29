// src/components/ProfileDropdown.jsx
// --- THE CORRECT, PROFESSIONAL VERSION ---

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";
import "../styles/ProfileDropdown.css";

// Importing icons for a professional look
import {
  FaUserCircle,
  FaBoxOpen,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaDesktop,
} from "react-icons/fa";

const ProfileDropdown = ({ onClose }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="profile-dropdown">
      <div className="dropdown-header">
        <p className="user-name">Hello, {currentUser.displayName || "User"}</p>
        <p className="user-email">{currentUser.email}</p>
      </div>

      <hr className="dropdown-divider" />

      <Link to="/profile" className="dropdown-item" onClick={onClose}>
        <FaUserCircle className="dropdown-icon" /> My Profile
      </Link>
      <Link to="/orders" className="dropdown-item" onClick={onClose}>
        <FaBoxOpen className="dropdown-icon" /> My Orders
      </Link>

      <hr className="dropdown-divider" />

      <div className="theme-switcher-section">
        <p className="theme-title">Theme</p>
        <div className="theme-options">
          <button
            className={`theme-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <FaSun /> Light
          </button>
          <button
            className={`theme-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <FaMoon /> Dark
          </button>
          <button
            className={`theme-btn ${theme === "system" ? "active" : ""}`}
            onClick={() => setTheme("system")}
          >
            <FaDesktop /> System
          </button>
        </div>
      </div>

      <hr className="dropdown-divider" />

      <button className="dropdown-item logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="dropdown-icon" /> Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
