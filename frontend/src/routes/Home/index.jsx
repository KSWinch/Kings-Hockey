import React, { useEffect, useState } from 'react';
import './index.css';
import InfoBox from './../../components/InfoBox';

const Home = () => {
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/getStats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    fetchPlayerStats();
  }, []);

  return (
    <div className="home-page">
      <div className="header-section">
        <h1>King's Hockey Team</h1>
        <h4>Winter 2024 - 2025</h4>
        <h4>Division 8</h4>
      </div>

      <div className="content-section">
        <InfoBox
          title="King's Player Stats"
          description=""
          players={playerStats} // Pass the playerStats as a prop
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
