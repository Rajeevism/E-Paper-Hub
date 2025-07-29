// src/components/SecondaryNavBar.jsx
// --- FULL UPDATED FILE ---

import React from "react";
// --- 1. Import NavLink instead of Link ---
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/SecondaryNavBar.css";

const SecondaryNavBar = () => {
  return (
    <div className="secondary-navbar-container">
      <nav className="secondary-navbar">
        {/* --- 2. Use NavLink for the "All" button --- */}
        {/* It automatically adds an 'active' class when the path matches */}
        <NavLink to="/" className="nav-item all-link" end>
          <FaBars />
          <span>All</span>
        </NavLink>

        {/* Use NavLink for other categories too */}
        <NavLink to="/category/books" className="nav-item">
          Books
        </NavLink>
        <NavLink to="/category/notebooks" className="nav-item">
          Notebooks
        </NavLink>
        <NavLink to="/category/newspapers" className="nav-item">
          Newspapers
        </NavLink>
        <NavLink to="/category/magazines" className="nav-item">
          Magazines
        </NavLink>
        <NavLink to="/category/e-library" className="nav-item">
          E-Library
        </NavLink>

        <NavLink to="/sell" className="nav-item sell-link">
          Sell on E-paper Hub
        </NavLink>
      </nav>
    </div>
  );
};

export default SecondaryNavBar;
