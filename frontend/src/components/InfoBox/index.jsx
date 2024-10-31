// src/components/InfoBox.jsx
import React from 'react';
import './../InfoBox/index.css';

const InfoBox = ({ title, description, imageUrl }) => {
  return (
    <div className="post-card">
      <header className="post-card-header">
        {imageUrl && (
          <div
            className="post-card-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        )}
        <h2 className="post-card-title">{title}</h2>
      </header>
      <section className="post-card-excerpt">
        <p>{description}</p>
      </section>
      <footer className="post-card-footer">
        <span>Kings</span> <span>•</span> <span>Hockey</span>
      </footer>
    </div>
  );
};

export default InfoBox;
