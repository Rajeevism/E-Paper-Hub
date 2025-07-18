// Create a new file: src/pages/SearchResultsPage.jsx
// --- FULL NEW FILE ---

import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import BookCard from "../components/BookCard";
import "../styles/HomePage.css"; // We can reuse the homepage styles for the grid

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q"); // Get the search query 'q' from the URL

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // NOTE: Firestore doesn't support full-text search natively.
        // This query performs a "starts-with" search and is case-sensitive.
        // For better search, consider a third-party service like Algolia.
        const searchQuery = query(
          collection(db, "books"),
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        );

        const querySnapshot = await getDocs(searchQuery);
        const searchResults = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(searchResults);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]); // Re-run the search whenever the searchTerm in the URL changes

  return (
    <div className="search-results-container">
      <section className="book-section">
        {loading ? (
          <h3>Searching for "{searchTerm}"...</h3>
        ) : (
          <h3>
            {results.length} results for "{searchTerm}"
          </h3>
        )}

        {error && <p className="error-message">{error}</p>}

        {!loading && results.length === 0 && !error && (
          <p>
            No books found matching your search. Try a different term or{" "}
            <Link to="/">explore all books</Link>.
          </p>
        )}

        <div className="book-grid">
          {results.map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              style={{ textDecoration: "none" }}
            >
              <BookCard
                title={book.title}
                price={book.price}
                mrp={book.mrp}
                discount={book.discount}
                condition={book.condition}
                imageUrl={book.imageUrl}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;
