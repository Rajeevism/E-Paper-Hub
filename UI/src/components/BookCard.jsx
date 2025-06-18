import React from "react";
import "/src/styles/BookCard.css";

const BookCard = ({ title, price, condition, imageUrl }) => {
  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={imageUrl} alt={title} className="book-image" />
      </div>
      <div className="book-details">
        <h4 className="book-title">{title}</h4>
        <p className="book-info">
          ₹{price} - {condition}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
