import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Using react-icons for the search icon
import "../styles/SearchBar.css"; // We'll create this CSS file next

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for books..."
        className="search-input"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
