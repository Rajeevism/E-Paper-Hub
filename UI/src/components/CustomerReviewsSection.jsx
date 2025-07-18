import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import ReviewsSummary from "./ReviewsSummary";
import ReviewList from "./ReviewList";
import "../styles/CustomerReviewsSection.css";

const CustomerReviewsSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    avg: 0,
    count: 0,
    distribution: {},
  });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!bookId) return;
      setLoading(true);
      try {
        const reviewsRef = collection(db, "books", bookId, "reviews");
        const q = query(reviewsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(fetchedReviews);
        if (fetchedReviews.length > 0) {
          const totalRating = fetchedReviews.reduce(
            (acc, review) => acc + review.rating,
            0
          );
          const avgRating = totalRating / fetchedReviews.length;
          const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          fetchedReviews.forEach((review) => {
            dist[review.rating] = (dist[review.rating] || 0) + 1;
          });
          setSummary({
            avg: avgRating,
            count: fetchedReviews.length,
            distribution: dist,
          });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [bookId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }
  if (reviews.length === 0) {
    return (
      <div className="customer-reviews-container">
        <h2>Customer reviews</h2>
        <p>No customer reviews yet.</p>
      </div>
    );
  }
  return (
    <div className="customer-reviews-container">
      <div className="reviews-grid">
        <div className="summary-column">
          {" "}
          <ReviewsSummary summary={summary} />{" "}
        </div>
        <div className="list-column">
          {" "}
          <ReviewList reviews={reviews} />{" "}
        </div>
      </div>
    </div>
  );
};
export default CustomerReviewsSection;
