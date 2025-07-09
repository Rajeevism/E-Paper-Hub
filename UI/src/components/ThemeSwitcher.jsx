// UI/src/components/ThemeSwitcher.jsx

import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { FaDesktop, FaSun, FaMoon } from "react-icons/fa";
// We will create this CSS file in the next step
import "../styles/ThemeSwitcher.css";

const ThemeSwitcher = ({ closeDropdown }) => {
  const { theme, setTheme } = useTheme();

  // This function now handles the logic for setting the theme
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    if (closeDropdown) {
      closeDropdown(); // This will close the dropdown after a selection is made
    }
  };

  return (
    <div className="theme-switcher-menu">
      <h4>Theme</h4>
      <ul>
        <li
          className={theme === "system" ? "active" : ""}
          onClick={() => handleThemeChange("system")}
        >
          <FaDesktop /> System
        </li>
        <li
          className={theme === "light" ? "active" : ""}
          onClick={() => handleThemeChange("light")}
        >
          <FaSun /> Light
        </li>
        <li
          className={theme === "dark" ? "active" : ""}
          onClick={() => handleThemeChange("dark")}
        >
          <FaMoon /> Dark
        </li>
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
