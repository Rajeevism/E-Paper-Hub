// UI/src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/appLogo.png";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx"; // Import the new component

const NavBar = ({ onProfileClick }) => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* ... navbar-left and navbar-center ... */}

      <div className="navbar-right">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/cart" className="nav-link">
          My Cart
        </Link>

        {currentUser ? (
          // If user is logged in, show clickable avatar
          <div className="profile-avatar-container">
            <img
              src={currentUser.photoURL || "default-avatar.png"} // Use a default image if none
              alt="Profile"
              className="profile-avatar"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && <ProfileDropdown />}
          </div>
        ) : (
          // If not logged in, show Profile button
          <a href="#" className="nav-link" onClick={onProfileClick}>
            Profile
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
