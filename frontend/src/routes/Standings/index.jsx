import React, { useEffect, useState } from 'react';
import './index.css';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('http://localhost:8080/standings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStandings(data);
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError('Failed to load standings data');
      }
    };

    fetchStandings();
  }, []);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStandings = [...standings].sort((a, b) => {
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
        <div className="table-responsive-wrapper">
          <table className="standings-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('rank')}>Rk</th>
                <th onClick={() => requestSort('team')}>Team</th>
                <th onClick={() => requestSort('games_played')}>GP</th>
                <th onClick={() => requestSort('wins')}>W</th>
                <th onClick={() => requestSort('losses')}>L</th>
                <th onClick={() => requestSort('ties')}>T</th>
                <th onClick={() => requestSort('overtime_losses')}>OT</th>
                <th onClick={() => requestSort('points')}>Pts</th>
                <th onClick={() => requestSort('regulation_wins')}>RW</th>
                <th onClick={() => requestSort('goals_for')}>GF</th>
                <th onClick={() => requestSort('goals_against')}>GA</th>
                <th onClick={() => requestSort('goal_differential')}>Diff</th>
                <th onClick={() => requestSort('penalty_minutes')}>PIM</th>
                <th onClick={() => requestSort('last_10_games')}>L10</th>
                <th onClick={() => requestSort('streak')}>Streak</th>
              </tr>
            </thead>
            <tbody>
              {sortedStandings.map((team, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{team.rank}</td>
                  <td>{team.team}</td>
                  <td>{team.games_played}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.ties}</td>
                  <td>{team.overtime_losses}</td>
                  <td>{team.points}</td>
                  <td>{team.regulation_wins}</td>
                  <td>{team.goals_for}</td>
                  <td>{team.goals_against}</td>
                  <td>{team.goal_differential}</td>
                  <td>{team.penalty_minutes}</td>
                  <td>{team.last_10_games}</td>
                  <td>{team.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Standings;
