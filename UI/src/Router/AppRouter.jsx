// src/Router/AppRouter.jsx
// --- FULL UPDATED FILE ---

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import BuyPage from "../pages/BuyPage";
import SellPage from "../pages/SellPage";
import ProtectedRoute from "../components/ProtectedRoute";
import BookDetailsPage from "../pages/BookDetailsPage";
import SearchResultsPage from "../pages/SearchResultsPage"; // --- 1. Import the new page ---

const AppRoutes = ({ onAuthRequired }) => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<HomePage openAuthModal={onAuthRequired} />} />
      <Route
        path="/book/:bookId"
        element={<BookDetailsPage openAuthModal={onAuthRequired} />}
      />
      <Route path="/buy" element={<BuyPage openAuthModal={onAuthRequired} />} />
      <Route
        path="/sell"
        element={<SellPage openAuthModal={onAuthRequired} />}
      />

      {/* --- 2. Add the new route for search results --- */}
      <Route path="/search" element={<SearchResultsPage />} />

      {/* --- PROTECTED ROUTES --- */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute onAuthRequired={onAuthRequired}>
            <CartPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
