import React, { useEffect, useState } from 'react';
import './index.css';

const Stats = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' }); // Sorting configuration

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
    const aValue =
      typeof a[sortConfig.key] === 'number' ? a[sortConfig.key] : Number(a[sortConfig.key]);
    const bValue =
      typeof b[sortConfig.key] === 'number' ? b[sortConfig.key] : Number(b[sortConfig.key]);

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="table-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="player-stats-table">
            <thead>
              <tr>
                <th className="col-number">#</th>
                <th onClick={() => requestSort('name')}>Name</th>
                <th className="col-gp" onClick={() => requestSort('games_played')}>
                  GP
                </th>
                <th className="col-goals" onClick={() => requestSort('goals')}>
                  G
                </th>
                <th className="col-assists" onClick={() => requestSort('assists')}>
                  A
                </th>
                <th className="col-points" onClick={() => requestSort('points')}>
                  Pts
                </th>
                {/* Other columns hidden on mobile */}
                <th className="col-ppga" onClick={() => requestSort('points_per_game')}>
                  PPGA
                </th>
                <th className="col-pim" onClick={() => requestSort('penalty_minutes')}>
                  PIM
                </th>
                <th className="col-ppg" onClick={() => requestSort('power_play_goals')}>
                  PPG
                </th>
                <th className="col-shg" onClick={() => requestSort('short_handed_goals')}>
                  SHG
                </th>
                <th className="col-gwg" onClick={() => requestSort('game_winning_goals')}>
                  GWG
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayerStats.map((player, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="col-number">{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td className="col-gp">{player.games_played}</td>
                  <td className="col-goals">{player.goals}</td>
                  <td className="col-assists">{player.assists}</td>
                  <td className="col-points">{player.points}</td>
                  <td className="col-ppga">{player.points_per_game}</td>
                  <td className="col-pim">{player.penalty_minutes}</td>
                  <td className="col-ppg">{player.power_play_goals}</td>
                  <td className="col-shg">{player.short_handed_goals}</td>
                  <td className="col-gwg">{player.game_winning_goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stats;
