import React from "react";
import RatingStars from "./RatingStars";
import "../styles/ReviewListAndItem.css";

const ReviewItem = ({ review }) => {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "Date not available";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className="review-item">
      <div className="reviewer-profile">
        <div className="reviewer-avatar">
          {review.userAvatar ? (
            <img src={review.userAvatar} alt={review.userName} />
          ) : (
            review.userName.charAt(0)
          )}
        </div>
        <span className="reviewer-name">{review.userName}</span>
      </div>
      <div className="review-content">
        <div className="review-header">
          <RatingStars rating={review.rating} />
          <h4 className="review-title">{review.title}</h4>
        </div>
        <p className="review-date">
          Reviewed in India on {formatDate(review.createdAt)}
        </p>
        <p className="review-text">{review.text}</p>
        <div className="review-actions">
          <button className="helpful-btn">Helpful</button>
          <span className="action-divider">|</span>
          <button className="report-btn">Report</button>
        </div>
      </div>
    </div>
  );
};
export default ReviewItem;
