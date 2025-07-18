// src/components/NavBar.jsx
// --- FULL UPDATED FILE ---

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // --- 1. Import useNavigate ---
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/appLogo.png";
import "../styles/NavBar.css";
import ProfileDropdown from "./ProfileDropdown.jsx";
import SearchBar from "./SearchBar.jsx"; // --- 2. Import SearchBar ---

const NavBar = ({ onProfileClick }) => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // --- 3. Initialize useNavigate ---

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- 4. Create a function to handle the search ---
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      // Navigate to a search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="E-Paper Hub" className="app-logo" />
          </Link>
        </div>

        {/* --- 5. Enable the SearchBar and pass the handleSearch function --- */}
        <div className="navbar-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="navbar-right">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link">
            My Cart
          </Link>

          {currentUser ? (
            <div className="profile-container" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="profile-btn"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-initial">
                    {currentUser.displayName
                      ? currentUser.displayName[0].toUpperCase()
                      : "U"}
                  </div>
                )}
              </button>
              {showDropdown && (
                <ProfileDropdown onClose={() => setShowDropdown(false)} />
              )}
            </div>
          ) : (
            <a href="#" className="nav-link" onClick={onProfileClick}>
              Profile
            </a>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
