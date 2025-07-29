// src/components/BookCard.jsx
// --- THE FINAL, CLEAN VERSION ---

import React from "react";
import RatingStars from "./RatingStars";
import "../styles/BookCard.css"; // We will make this file work.

const BookCard = ({
  title,
  price,
  mrp,
  discount,
  condition,
  imageUrl,
  rating_avg,
  rating_count,
}) => {
  return (
    <div className="book-card-wrapper">
      <div className="book-card">
        {discount > 0 && <div className="discount-badge">{discount}% off</div>}

        <div className="book-card-image-container">
          <img src={imageUrl} alt={title} className="book-card-image" />
        </div>

        <div className="book-card-info">
          <h4 className="book-card-title">{title}</h4>

          {rating_avg && (
            <RatingStars rating={rating_avg} count={rating_count} />
          )}

          <div className="book-card-price-container">
            <span className="book-card-price">₹{price}</span>
            {mrp && <span className="book-card-mrp">M.R.P: ₹{mrp}</span>}
          </div>
          <div className="book-card-condition">{condition}</div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
