// src/context/ThemeContext.jsx
// --- REPLACE THE ENTIRE FILE WITH THIS ---

import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // 1. Get theme from localStorage or default to 'system'
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  // 2. This is the logic that applies the theme to the whole app
  useEffect(() => {
    const body = window.document.body;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (newTheme) => {
      localStorage.setItem("theme", newTheme);

      if (newTheme === "system") {
        // If system preference is dark, add 'dark' class, otherwise remove it
        systemPrefersDark.matches
          ? body.classList.add("dark")
          : body.classList.remove("dark");
      } else {
        // If theme is 'dark', add 'dark' class, otherwise remove it
        newTheme === "dark"
          ? body.classList.add("dark")
          : body.classList.remove("dark");
      }
    };

    applyTheme(theme);

    // 3. Listen for changes in system preference
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        e.matches ? body.classList.add("dark") : body.classList.remove("dark");
      }
    };

    systemPrefersDark.addEventListener("change", handleSystemThemeChange);

    // Cleanup function
    return () => {
      systemPrefersDark.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]); // This effect runs every time the `theme` state changes

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
