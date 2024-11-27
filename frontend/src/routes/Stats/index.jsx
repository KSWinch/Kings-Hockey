import React, { useEffect, useState } from 'react';
import './index.css';
import { ec2ip, countryMapping } from '../../utils/constants';
import Canada from '../../assets/emoji/ca.png';
import China from '../../assets/emoji/cn.png';
import Nigeria from '../../assets/emoji/ng.png';
import Tanzania from '../../assets/emoji/tz.png';
import HongKong from '../../assets/emoji/hk.png';

const countryFlags = {
  Canada,
  China,
  Nigeria,
  Tanzania,
  HongKong,
};

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

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return <span className="sort-arrow">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
    }
    return '';
  };

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
                    <th className="stats-sticky-column">#</th>
                    <th className="stats-sticky-name-column" onClick={() => requestSort('name')}>
                      <span className="th-wrapper">Name {getSortIndicator('name')}</span>
                    </th>
                    <th>Country</th>
                    <th onClick={() => requestSort('games_played')}>
                      <span className="th-wrapper">GP {getSortIndicator('games_played')}</span>
                    </th>
                    <th onClick={() => requestSort('goals')}>
                      <span className="th-wrapper">G {getSortIndicator('goals')}</span>
                    </th>
                    <th onClick={() => requestSort('assists')}>
                      <span className="th-wrapper">A {getSortIndicator('assists')}</span>
                    </th>
                    <th onClick={() => requestSort('points')}>
                      <span className="th-wrapper">Pts {getSortIndicator('points')}</span>
                    </th>
                    <th onClick={() => requestSort('points_per_game')}>
                      <span className="th-wrapper">PPGA {getSortIndicator('points_per_game')}</span>
                    </th>
                    <th onClick={() => requestSort('penalty_minutes')}>
                      <span className="th-wrapper">PIM {getSortIndicator('penalty_minutes')}</span>
                    </th>
                    <th onClick={() => requestSort('game_winning_goals')}>
                      <span className="th-wrapper">GWG {getSortIndicator('game_winning_goals')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayerStats.map((player, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'stats-even-row' : 'stats-odd-row'}>
                      <td className={`stats-sticky-column ${sortConfig.key === 'jersey_number' ? 'sorted-column' : ''}`}>
                        {player.jersey_number}
                      </td>
                      <td className={`stats-sticky-name-column stats-name-column`}>{player.name}</td>
                      <td>
                        {' '}
                        <img src={countryFlags[countryMapping[player.name]]} alt={countryMapping[player.name]} className="country-flag" />
                      </td>
                      <td className={sortConfig.key === 'games_played' ? 'sorted-column' : ''}>{player.games_played}</td>
                      <td className={sortConfig.key === 'goals' ? 'sorted-column' : ''}>{player.goals}</td>
                      <td className={sortConfig.key === 'assists' ? 'sorted-column' : ''}>{player.assists}</td>
                      <td className={sortConfig.key === 'points' ? 'sorted-column' : ''}>{player.points}</td>
                      <td className={sortConfig.key === 'points_per_game' ? 'sorted-column' : ''}>{player.points_per_game}</td>
                      <td className={sortConfig.key === 'penalty_minutes' ? 'sorted-column' : ''}>{player.penalty_minutes}</td>
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
