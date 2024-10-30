import React from 'react';
import './index.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="header-section">
        <h1>King's Hockey Team</h1>
        <p>Winter 2024-2025 Division 8</p>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h2>About Us</h2>
          <p>Some information about the website or the brand.</p>
        </div>
        <div className="info-box">
          <h2></h2>
          <p>Details about services or offerings.</p>
        </div>
        <div className="info-box">
          <h2></h2>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
