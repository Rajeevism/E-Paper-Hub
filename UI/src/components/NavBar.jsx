import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/appLogo.png";
import "../styles/NavBar.css";
import ProfileDropdown from "./ProfileDropdown.jsx";

const NavBar = ({ onProfileClick }) => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // --- FIX: Ref to detect outside clicks

  // --- FIX: Logic to close dropdown when clicking outside ---
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

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="E-Paper Hub" className="app-logo" />
          </Link>
        </div>

        <div className="navbar-center">{/* <SearchBar /> */}</div>

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
                  // --- FIX: Show initials if no photo exists ---
                  <div className="profile-avatar-initial">
                    {currentUser.displayName
                      ? currentUser.displayName[0].toUpperCase()
                      : "U"}
                  </div>
                )}
              </button>
              {/* --- FIX: Pass a function to close the dropdown --- */}
              {showDropdown && (
                <ProfileDropdown onClose={() => setShowDropdown(false)} />
              )}
            </div>
          ) : (
            // If not logged in, show the original Profile/Login link
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
