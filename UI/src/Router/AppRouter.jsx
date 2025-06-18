import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import CartPage from "../pages/CartPage.jsx";
import BuyPage from "../pages/BuyPage.jsx";
import SellPage from "../pages/SellPage.jsx";

const AppRouter = ({ openAuthModal }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage openAuthModal={openAuthModal} />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/sell-new-and-old-books/papers" element={<SellPage />} />
      <Route path="/buy-new-and-old-books/papers" element={<BuyPage />} />
    </Routes>
  );
};

export default AppRouter;
