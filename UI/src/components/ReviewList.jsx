import React from "react";
import ReviewItem from "./ReviewItem";
import "../styles/ReviewListAndItem.css";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h3>Top reviews from India</h3>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};
export default ReviewList;
