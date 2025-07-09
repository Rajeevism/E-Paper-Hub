// UI/src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

// Import what we need from Firebase
import { db } from "../firebase.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomePage = ({ openAuthModal }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // State to hold our books from the database
  const [usedBooks, setUsedBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // Get 'Used' books
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

        // Get 'New' books
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
  }, []); // The empty array means this runs only once

  const handleProtectedAction = (actionType, bookId = null) => {
    if (currentUser) {
      switch (actionType) {
        case "Buy Books":
          navigate("/buy");
          break;
        case "Sell Books/Papers":
          navigate("/sell");
          break;
        case "View Book":
          navigate(`/book/${bookId}`);
          break;
        default:
          break;
      }
    } else {
      openAuthModal();
    }
  };

  return (
    <>
      <section className="hero">
        <h2>What would you like to do?</h2>
        <div className="hero-buttons">
          <button
            className="buy-btn"
            onClick={() => handleProtectedAction("Buy Books")}
          >
            📘 Buy Books
          </button>
          <button
            className="sell-btn"
            onClick={() => handleProtectedAction("Sell Books/Papers")}
          >
            ♻️ Sell Books/Papers
          </button>
        </div>
      </section>

      {loading && <p style={{ textAlign: "center" }}>Loading books...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {/* --- NEW BOOKS SECTION IS NOW FIRST --- */}
          <section className="book-section">
            <h3>New Books</h3>
            <div className="book-grid">
              {newBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleProtectedAction("View Book", book.id)}
                  style={{ cursor: "pointer" }}
                >
                  <BookCard
                    title={book.title}
                    price={book.price}
                    mrp={book.mrp}
                    discount={book.discount}
                    condition={book.condition}
                    imageUrl={book.imageUrl}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* --- OLD BOOKS SECTION IS NOW SECOND --- */}
          <section className="book-section">
            <h3>Old Books</h3>
            <div className="book-grid">
              {usedBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleProtectedAction("View Book", book.id)}
                  style={{ cursor: "pointer" }}
                >
                  <BookCard
                    title={book.title}
                    price={book.price}
                    mrp={book.mrp}
                    discount={book.discount}
                    condition={book.condition}
                    imageUrl={book.imageUrl}
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
