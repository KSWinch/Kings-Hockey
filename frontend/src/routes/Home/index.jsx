import React from 'react';
import './index.css';
import InfoBox from './../../components/InfoBox';

const Home = () => {
  return (
    <div className="home-page">
      <div className="header-section">
        <h1>King's Hockey Team</h1>
        <h4>Winter 2024 - 2025</h4>
        <h4>Division 8</h4>
      </div>

      <div className="content-section">
        <InfoBox
          title="Last Game Recap"
          description="Previous game information in here! Spoiler.. We suck!"
          imageUrl="/images/rink.jpg"
        />

        <InfoBox
          title="Temp"
          description="Details about services or offerings."
          imageUrl="/images/rink.jpg"
        />

        <InfoBox
          title="Temp"
          description="Temp add data for testing 010232"
          imageUrl="/images/rink.jpg"
        />
      </div>
    </div>
  );
};

export default Home;
