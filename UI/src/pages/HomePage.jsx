// src/pages/HomePage.jsx
// --- FULL UPDATED FILE ---

import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

import { db } from "../firebase.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomePage = ({ openAuthModal }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [usedBooks, setUsedBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const usedBooksQuery = query(
          collection(db, "books"),
          where("condition", "==", "Used")
        );
        const usedBooksSnapshot = await getDocs(usedBooksQuery);
        const usedBooksList = usedBooksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsedBooks(usedBooksList);

        const newBooksQuery = query(
          collection(db, "books"),
          where("condition", "==", "New")
        );
        const newBooksSnapshot = await getDocs(newBooksQuery);
        const newBooksList = newBooksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewBooks(newBooksList);
      } catch (err) {
        console.error("Error fetching books: ", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <section className="hero">
        <h2>What would you like to do?</h2>
        <div className="hero-buttons">
          <button className="buy-btn" onClick={() => navigate("/buy")}>
            📘 Buy Books
          </button>
          <button className="sell-btn" onClick={() => navigate("/sell")}>
            ♻️ Sell Books/Papers
          </button>
        </div>
      </section>

      {loading && <p style={{ textAlign: "center" }}>Loading books...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <section className="book-section">
            <h3>New Books</h3>
            <div className="book-grid">
              {newBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <BookCard
                    title={book.title}
                    price={book.price}
                    mrp={book.mrp}
                    discount={book.discount}
                    condition={book.condition}
                    imageUrl={book.imageUrl}
                    // --- THIS IS THE FIX ---
                    rating_avg={book.ratingAvg}
                    rating_count={book.ratingCount}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="book-section">
            <h3>Old Books</h3>
            <div className="book-grid">
              {usedBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <BookCard
                    title={book.title}
                    price={book.price}
                    mrp={book.mrp}
                    discount={book.discount}
                    condition={book.condition}
                    imageUrl={book.imageUrl}
                    // --- THIS IS THE FIX ---
                    rating_avg={book.ratingAvg}
                    rating_count={book.ratingCount}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
