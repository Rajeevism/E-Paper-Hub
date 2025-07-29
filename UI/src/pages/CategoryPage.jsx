// Create this new file: src/pages/CategoryPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import BookCard from "../components/BookCard";
import "../styles/HomePage.css"; // Reuse homepage styles

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // This maps your URL (e.g., 'books') to the categories in your database
      const categoryMap = {
        books: ["new-book", "used-book"],
        notebooks: ["stationery"], // Assuming notebooks fall under stationery
        newspapers: ["e-paper"],
        // Add more mappings here
      };
      const firestoreCategories = categoryMap[categoryName] || [categoryName];

      const productsRef = collection(db, "books");
      const q = query(
        productsRef,
        where("category", "in", firestoreCategories)
      );
      const querySnapshot = await getDocs(q);
      setProducts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  return (
    <div className="category-page-container">
      <section className="book-section">
        <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="book-grid">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/book/${product.id}`)}
              >
                <BookCard
                  {...product}
                  rating_avg={product.ratingAvg}
                  rating_count={product.ratingCount}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
