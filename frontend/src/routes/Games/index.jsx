import React, { useEffect, useState } from 'react';
import { ec2ip } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import './index.scss';

const Games = () => {
  const [gameData, setGameData] = useState([]);
  const location = useLocation();
  const home_team = location.state.game.home_team;
  const away_team = location.state.game.away_team;
  const home_score = location.state.game.home_score;
  const away_score = location.state.game.away_score;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        console.log(location.state);
        const response = await fetch(`${ec2ip}/goals/${location.state.game.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGameData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGame();
  }, []);

  return (
    <div>
      <div className="game-container">
        <h1>
          {away_team} @ {home_team}
        </h1>
        <h2>
          {away_score} - {home_score}
        </h2>
        <table className="game-header">
          <thead>
            <tr>
              <th>Time</th>
              <th>Goal Scorer</th>
              <th>Assist</th>
              <th>Assist</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {gameData.map((goal) => {
              return (
                <tr key={goal.id}>
                  <td>{goal.time}</td>
                  <td>{goal.scorer}</td>
                  <td>{goal.assister_1}</td>
                  <td>{goal.assister_2}</td>
                  <td>{goal.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Games;
