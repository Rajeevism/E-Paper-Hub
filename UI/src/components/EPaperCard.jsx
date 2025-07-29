// Create this new file: src/components/EPaperCard.jsx

import React from "react";
import "../styles/EPaperCard.css"; // This will link to the CSS we create next

const EPaperCard = ({ title, publisher, imageUrl }) => {
  return (
    <div className="epaper-card">
      <div className="epaper-card-image-container">
        <img src={imageUrl} alt={title} className="epaper-card-image" />
      </div>
      <div className="epaper-card-info">
        <h4 className="epaper-card-title">{title}</h4>
        <p className="epaper-card-publisher">{publisher}</p>
        <button className="read-now-btn">Read Now</button>
      </div>
    </div>
  );
};

export default EPaperCard;
