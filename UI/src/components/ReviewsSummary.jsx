import React from "react";
import RatingStars from "./RatingStars";
import "../styles/ReviewsSummary.css";

const ReviewsSummary = ({ summary }) => {
  const { avg, count, distribution } = summary;
  return (
    <div className="reviews-summary">
      <h2>Customer reviews</h2>
      <div className="summary-overall-rating">
        <RatingStars rating={avg} />
        <span>{avg.toFixed(1)} out of 5</span>
      </div>
      <p className="total-ratings-text">{count} global ratings</p>
      <div className="rating-distribution">
        {[5, 4, 3, 2, 1].map((star) => {
          const percentage =
            count > 0 ? ((distribution[star] || 0) / count) * 100 : 0;
          return (
            <div key={star} className="rating-bar-row">
              <span className="star-label">{star} star</span>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="percentage-label">
                {Math.round(percentage)}%
              </span>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="write-review-section">
        <h3>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <button className="write-review-btn">Write a product review</button>
      </div>
    </div>
  );
};
export default ReviewsSummary;
