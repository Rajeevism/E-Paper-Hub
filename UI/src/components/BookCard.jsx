// Create or replace the file: src/components/BookCard.jsx
import React from "react";
import "../styles/BookCard.css";
import RatingStars from "./RatingStars"; // <-- Import the new component

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
    <div className="book-card">
      {discount > 0 && <div className="discount-badge">{discount}% off</div>}
      <div className="book-card-image-container">
        <img src={imageUrl} alt={title} className="book-card-image" />
      </div>
      <div className="book-card-info">
        <h4 className="book-card-title">{title}</h4>

        {/* --- THIS IS THE FIX --- */}
        {/* It will only show the stars if the rating_avg prop exists */}
        {rating_avg && <RatingStars rating={rating_avg} count={rating_count} />}

        <div className="book-card-price-container">
          <span className="book-card-price">₹{price}</span>
          {mrp && <span className="book-card-mrp">M.R.P: ₹{mrp}</span>}
        </div>
        <div className="book-card-condition">{condition}</div>
      </div>
    </div>
  );
};

export default BookCard;
