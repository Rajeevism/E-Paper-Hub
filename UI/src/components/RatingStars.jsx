import React from "react";
import "../styles/RatingStars.css";

const RatingStars = ({ rating, count }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="rating-container">
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full-star">
            ★
          </span>
        ))}
        {halfStar === 1 && <span className="star half-star">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty-star">
            ★
          </span>
        ))}
      </div>
      {count !== undefined && <span className="rating-count">({count})</span>}
    </div>
  );
};

export default RatingStars;
