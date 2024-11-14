import React, { useEffect, useState } from 'react';
import './index.css';

const Stats = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' }); // Sorting configuration

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`${ec2ip}/stats`);
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

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayerStats = [...playerStats].sort((a, b) => {
    const aValue = typeof a[sortConfig.key] === 'number' ? a[sortConfig.key] : Number(a[sortConfig.key]);
    const bValue = typeof b[sortConfig.key] === 'number' ? b[sortConfig.key] : Number(b[sortConfig.key]);

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {playerStats ? (
        <div className="stats-table-container">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="stats-table-responsive-wrapper">
              <table className="player-stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th onClick={() => requestSort('name')}>Name</th>
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
                    <tr key={index} className={index % 2 === 0 ? 'stats-even-row' : 'stats-odd-row'}>
                      <td className={sortConfig.key === 'jersey_number' ? 'sorted-column' : ''}>{player.jersey_number}</td>
                      <td className="name-column">{player.name}</td>
                      <td className={sortConfig.key === 'games_played' ? 'sorted-column' : ''}>{player.games_played}</td>
                      <td className={sortConfig.key === 'goals' ? 'sorted-column' : ''}>{player.goals}</td>
                      <td className={sortConfig.key === 'assists' ? 'sorted-column' : ''}>{player.assists}</td>
                      <td className={sortConfig.key === 'points' ? 'sorted-column' : ''}>{player.points}</td>
                      <td className={sortConfig.key === 'points_per_game' ? 'sorted-column' : ''}>{player.points_per_game}</td>
                      <td className={sortConfig.key === 'penalty_minutes' ? 'sorted-column' : ''}>{player.penalty_minutes}</td>
                      <td className={sortConfig.key === 'power_play_goals' ? 'sorted-column' : ''}>{player.power_play_goals}</td>
                      <td className={sortConfig.key === 'short_handed_goals' ? 'sorted-column' : ''}>{player.short_handed_goals}</td>
                      <td className={sortConfig.key === 'game_winning_goals' ? 'sorted-column' : ''}>{player.game_winning_goals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <span>Loading</span>
      )}
    </>
  );
};

export default Stats;
