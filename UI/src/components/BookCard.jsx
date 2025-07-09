// UI/src/components/BookCard.jsx

import React from "react";
import "../styles/BookCard.css"; // Corrected path as per your file structure

const BookCard = ({ title, price, mrp, discount, condition, imageUrl }) => {
  return (
    <div className="book-card">
      {/* Conditionally render the discount badge ONLY if a discount exists */}
      {discount && <div className="discount-badge">{discount}% off</div>}

      <div className="book-image-container">
        <img src={imageUrl} alt={title} className="book-image" />
      </div>
      <div className="book-details">
        <h4 className="book-title">{title}</h4>
        <div className="book-price-container">
          <span className="current-price">₹{price}</span>
          {/* Conditionally render the MRP only if it exists */}
          {mrp && <span className="original-price">M.R.P: ₹{mrp}</span>}
        </div>
        <p className="book-condition">{condition}</p>
      </div>
    </div>
  );
};

export default BookCard;
