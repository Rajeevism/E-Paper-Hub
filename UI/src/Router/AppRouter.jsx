import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import BuyPage from "../pages/BuyPage";
import SellPage from "../pages/SellPage";
import ProtectedRoute from "../components/ProtectedRoute";
// --- Accept the onAuthRequired prop ---
const AppRoutes = ({ onAuthRequired }) => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<HomePage />} />

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute onAuthRequired={onAuthRequired}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buy"
        element={
          <ProtectedRoute onAuthRequired={onAuthRequired}>
            <BuyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sell"
        element={
          <ProtectedRoute onAuthRequired={onAuthRequired}>
            <SellPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
