// src/pages/HomePage.jsx
// --- FULL UPDATED FILE ---

import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import EPaperCard from "../components/EPaperCard.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

import { db } from "../firebase.jsx";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

const HomePage = () => {
  const navigate = useNavigate();

  const [ePapers, setEPapers] = useState([]);
  const [stationery, setStationery] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [usedBooks, setUsedBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, "books");

        const epapersQuery = query(
          productsRef,
          where("category", "==", "e-paper"),
          limit(5)
        );
        const epapersSnapshot = await getDocs(epapersQuery);
        setEPapers(
          epapersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const stationeryQuery = query(
          productsRef,
          where("category", "==", "stationery"),
          limit(5)
        );
        const stationerySnapshot = await getDocs(stationeryQuery);
        setStationery(
          stationerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const newBooksQuery = query(
          productsRef,
          where("category", "==", "new-book"),
          limit(5)
        );
        const newBooksSnapshot = await getDocs(newBooksQuery);
        setNewBooks(
          newBooksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const usedBooksQuery = query(
          productsRef,
          where("category", "==", "used-book"),
          limit(5)
        );
        const usedBooksSnapshot = await getDocs(usedBooksQuery);
        setUsedBooks(
          usedBooksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProductGrid = (products) => (
    <div className="book-grid">
      {products.map((product) => (
        <div key={product.id} onClick={() => navigate(`/book/${product.id}`)}>
          <BookCard
            title={product.title}
            price={product.price}
            mrp={product.mrp}
            discount={product.discount}
            condition={product.condition}
            imageUrl={product.imageUrl}
            rating_avg={product.ratingAvg}
            rating_count={product.ratingCount}
          />
        </div>
      ))}
    </div>
  );

  const renderEPaperGrid = (papers) => (
    <div className="book-grid">
      {papers.map((paper) => (
        <div key={paper.id} onClick={() => navigate(`/epaper/${paper.id}`)}>
          <EPaperCard
            title={paper.title}
            publisher={paper.publisher}
            imageUrl={paper.imageUrl}
          />
        </div>
      ))}
    </div>
  );

  return (
    // The content is now back!
    <>
      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {ePapers.length > 0 && (
            <section className="book-section">
              <h3>Today's News</h3>
              {renderEPaperGrid(ePapers)}
            </section>
          )}

          {stationery.length > 0 && (
            <section className="book-section">
              <h3>Study & Office Essentials</h3>
              {renderProductGrid(stationery)}
            </section>
          )}

          {newBooks.length > 0 && (
            <section className="book-section">
              <h3>Bestselling Books</h3>
              {renderProductGrid(newBooks)}
            </section>
          )}

          {usedBooks.length > 0 && (
            <section className="book-section">
              <h3>The Pre-Loved Library</h3>
              {renderProductGrid(usedBooks)}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
