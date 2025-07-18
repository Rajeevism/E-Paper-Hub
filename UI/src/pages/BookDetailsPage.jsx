// src/pages/BookDetailsPage.jsx
// --- FULL UPDATED FILE ---

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/BookDetailsPage.css";
import RatingStars from "../components/RatingStars";
import CustomerReviewsSection from "../components/CustomerReviewsSection";

const BookDetailsPage = ({ openAuthModal }) => {
  const { bookId } = useParams();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookRef = doc(db, "books", bookId);
        const bookSnap = await getDoc(bookRef);

        if (bookSnap.exists()) {
          setBook({ id: bookSnap.id, ...bookSnap.data() });
        } else {
          setError("Sorry, this book could not be found.");
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleAddToCart = () => {
    if (currentUser) {
      alert(
        `Book "${book.title}" added to your cart! (Functionality to be built)`
      );
    } else {
      openAuthModal();
    }
  };

  const handleRatingClick = (e) => {
    e.preventDefault();
    document
      .getElementById("customer-reviews-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", fontSize: "1.2rem", padding: "2rem" }}>
        Loading book...
      </p>
    );
  if (error) return <p className="error-message">{error}</p>;
  if (!book) return null;

  return (
    <div className="book-detail-page-container">
      <div className="book-detail-main-content">
        <div className="image-column">
          {" "}
          <img src={book.imageUrl} alt={book.title} />{" "}
        </div>
        <div className="info-column">
          <span className="condition-badge">{book.condition}</span>
          <h1>{book.title}</h1>
          {book.author && <p className="author-link">by {book.author}</p>}

          {/* --- THIS IS THE FIX --- */}
          {/* Using book.ratingAvg and book.ratingCount (camelCase) to match Firebase */}
          {book.ratingAvg && book.ratingCount > 0 && (
            <a
              href="#customer-reviews-section"
              className="details-rating-link"
              onClick={handleRatingClick}
            >
              <RatingStars rating={book.ratingAvg} />
              <span className="rating-count-link">
                {book.ratingCount} ratings
              </span>
            </a>
          )}

          <hr />
          <div className="price-section">
            <span className="price-symbol">₹</span>
            <span className="price-whole">{book.price}</span>
            <div className="mrp-details">
              {" "}
              <span>M.R.P.: </span>{" "}
              <span className="mrp-price">₹{book.mrp}</span>{" "}
            </div>
            <span className="discount-percent">({book.discount}% off)</span>
          </div>
          <p className="info-text">Inclusive of all taxes</p>
          <hr />
          <div className="description-section">
            <h3>Description</h3>
            <p>
              {book.description ||
                "No description available for this book yet."}
            </p>
          </div>
        </div>
        <div className="buy-box-column">
          <div className="buy-box">
            <div className="buy-box-price">
              {" "}
              <span className="price-symbol">₹</span>
              <span className="price-whole">{book.price}</span>{" "}
            </div>
            <p className="delivery-info">
              {" "}
              <span className="delivery-fast">FREE delivery</span> Monday, July
              22.{" "}
            </p>
            <p className="stock-status">In Stock.</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              {" "}
              Add to Cart{" "}
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>

      <div id="customer-reviews-section">
        <CustomerReviewsSection bookId={bookId} />
      </div>
    </div>
  );
};

export default BookDetailsPage;
