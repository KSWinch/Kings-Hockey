import React, { useEffect, useState } from 'react';
import './index.css';

const Gallery = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [error, setError] = useState(null);

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
        setError('Failed to load player statistics');
      }
    };

    fetchPlayerStats();
  }, []);

  return (
    <div className="table-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="player-stats-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Pos</th>
              <th>GP</th>
              <th>G</th>
              <th>A</th>
              <th>Pts</th>
              <th>PPGA</th>
              <th>PIM</th>
              <th>PPG</th>
              <th>SHG</th>
              <th>GWG</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((player, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{player.jerseyNumber}</td>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.gamesPlayed}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.points}</td>
                <td>{player.pointsPerGame}</td>
                <td>{player.penaltyMinutes}</td>
                <td>{player.powerPlayGoals}</td>
                <td>{player.shortHandedGoals}</td>
                <td>{player.gameWinningGoals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Gallery;
