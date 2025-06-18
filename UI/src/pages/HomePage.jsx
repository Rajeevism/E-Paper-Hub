import React from "react";
import BookCard from "../components/BookCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = ({ openAuthModal }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const allBooks = [
    {
      id: 1,
      title: "Data Structures",
      price: 250,
      condition: "Used",
      imageUrl: "https://placehold.co/220x200/a7c7e7/333?text=DS",
    },
    {
      id: 2,
      title: "History of India",
      price: 150,
      condition: "Used",
      imageUrl: "https://placehold.co/220x200/f0e68c/333?text=History",
    },
    {
      id: 3,
      title: "Calculus",
      price: 300,
      condition: "Used",
      imageUrl: "https://placehold.co/220x200/d3d3d3/333?text=Calculus",
    },
    {
      id: 4,
      title: "Machine Learning",
      price: 350,
      condition: "Used",
      imageUrl: "https://placehold.co/220x200/b2f2bb/333?text=ML",
    },
    {
      id: 5,
      title: "React Explained",
      price: 500,
      condition: "New",
      imageUrl: "https://placehold.co/220x200/add8e6/333?text=React",
    },
    {
      id: 6,
      title: "The Python Guide",
      price: 450,
      condition: "New",
      imageUrl: "https://placehold.co/220x200/ffd700/333?text=Python",
    },
    {
      id: 7,
      title: "Intro to Economics",
      price: 320,
      condition: "New",
      imageUrl: "https://placehold.co/220x200/90ee90/333?text=Eco",
    },
    {
      id: 8,
      title: "World Atlas",
      price: 600,
      condition: "New",
      imageUrl: "https://placehold.co/220x200/e6e6fa/333?text=Atlas",
    },
  ];

  const usedBooks = allBooks.filter((book) => book.condition === "Used");
  const newBooks = allBooks.filter((book) => book.condition === "New");

  //  This is the fully updated gatekeeper function
  const handleProtectedAction = (actionType, bookId = null) => {
    if (currentUser) {
      // If the user IS logged in, perform the REAL navigation. NO alerts.
      switch (actionType) {
        case "Buy Books":
          navigate("/buy-new-and-old-books/papers"); // Use the exact path from your router
          break;
        case "Sell Books/Papers":
          navigate("/sell-new-and-old-books/papers"); // Use the exact path from your router
          break;
        case "View Book":
          // This is a placeholder for when you build the book details page
          console.log(`Navigate to details for book with ID: ${bookId}`);
          // In the future, this would be: navigate(`/book/${bookId}`);
          break;
        default:
          break;
      }
    } else {
      // If the user is NOT logged in, open the login modal.
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

      <section className="book-section">
        <h3>Old Books</h3>
        <div className="book-grid">
          {usedBooks.map((book) => (
            // Pass a clean action type and the book's ID
            <div
              key={book.id}
              onClick={() => handleProtectedAction("View Book", book.id)}
            >
              <BookCard
                title={book.title}
                price={book.price}
                condition={book.condition}
                imageUrl={book.imageUrl}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="book-section">
        <h3>New Books</h3>
        <div className="book-grid">
          {newBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleProtectedAction("View Book", book.id)}
            >
              <BookCard
                title={book.title}
                price={book.price}
                condition={book.condition}
                imageUrl={book.imageUrl}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
