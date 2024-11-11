import React, { useEffect, useState } from 'react';
import './index.css';
import InfoBox from './../../components/InfoBox';

const Home = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [standingsData, setStandingsData] = useState([]); // For standings !!

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch('http://54.234.144.204:8080/stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    const fetchGamesData = async () => {
      try {
        const response = await fetch('http://54.234.144.204:8080/games');
        const data = await response.json();
        setGamesData(data); // Set gamesData with fetched data
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    // Standings spot reserved
    const fetchStandingsData = async () => {
      // New function to fetch standings data
      try {
        const response = await fetch('http://54.234.144.204:8080/standings');
        const data = await response.json();
        setStandingsData(data); // Set standingsData with fetched data
      } catch (error) {
        console.error('Error fetching standings data:', error);
      }
    };

    fetchPlayerStats();
    fetchGamesData();
    fetchStandingsData();
  }, []);

  return (
    <div className="home-page">
      <div className="header-section">
        <h1>King's Hockey Team</h1>
        <h4>Winter 2024 - 2025</h4>
        <h4>Division 9</h4>
      </div>

      <div className="content-section">
        <InfoBox
          title="King's Top Player Stats"
          description="Top 3 Player Stats"
          players={playerStats} // Pass the playerStats as a prop
        />

        <InfoBox
          title="Upcoming Games"
          description="The next scheduled game."
          games={gamesData} // Display only the top 2 upcoming games
        />

        <InfoBox
          title="Standings"
          description="Current standings for Division 8"
          standings={standingsData} // Display only the top 2 upcoming games
        />
      </div>
    </div>
  );
};

export default Home;
