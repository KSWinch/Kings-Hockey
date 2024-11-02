import React, { useEffect, useState } from 'react';
import './index.css';

const Gallery = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/stats');
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

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort playerStats based on sortConfig
  const sortedPlayerStats = [...playerStats].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="table-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="player-stats-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('jersey_number')}>#</th>
              <th onClick={() => requestSort('name')}>Name</th>
              <th onClick={() => requestSort('position')}>Pos</th>
              <th onClick={() => requestSort('games_played')}>GP</th>
              <th onClick={() => requestSort('goals')}>G</th>
              <th onClick={() => requestSort('assists')}>A</th>
              <th onClick={() => requestSort('points')}>Pts</th>
              <th onClick={() => requestSort('points_per_game')}>PPGA</th>
              <th onClick={() => requestSort('penalty_minutes')}>PIM</th>
              <th onClick={() => requestSort('power_play_goals')}>PPG</th>
              <th onClick={() => requestSort('short_handed_goals')}>SHG</th>
              <th onClick={() => requestSort('game_winning_goals')}>GWG</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayerStats.map((player, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{player.jersey_number}</td>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.games_played}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.points}</td>
                <td>{player.points_per_game}</td>
                <td>{player.penalty_minutes}</td>
                <td>{player.power_play_goals}</td>
                <td>{player.short_handed_goals}</td>
                <td>{player.game_winning_goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Gallery;
