import React, { useEffect, useState } from 'react';
import { ec2ip } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import './index.scss';

const Games = () => {
  const [gameData, setGameData] = useState([]);
  const [penaltyData, setPenaltyData] = useState([]);
  const location = useLocation();
  const home_team = location.state.game.home_team;
  const away_team = location.state.game.away_team;
  const home_score = location.state.game.home_score;
  const away_score = location.state.game.away_score;
  const venue = location.state.game.location + ' - ' + location.state.game.rink;
  const time = location.state.game.time;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${ec2ip}/goals/${location.state.game.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const fetchPenalty = async () => {
      try {
        const response = await fetch(`${ec2ip}/penalties/${location.state.game.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPenaltyData(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGame();
    fetchPenalty();
  }, [location.state]);

  return (
    <div className="games-page">
      {/* Header Section */}
      <div className="header">
        <div className="teams-score">
          <h2>
            {away_team} {away_score} - {home_team} {home_score}
          </h2>
          <br></br>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="left-panel">
          {/* Scoring Summary */}
          <div className="scoring-summary">
            <h3>Scoring Summary</h3>
            <ul>
              {gameData.map((goal) => (
                <li key={goal.id}>
                  <span>{goal.team} </span>
                  <span>{goal.time} - </span>
                  <span>{goal.scorer} (</span>
                  <span>
                    Assist: {goal.assister_1} {goal.assister_2})
                  </span>
                  <span> {goal.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Penalty Summary */}
          <div className="penalty-summary">
            <h3>Penalty Summary</h3>
            <ul>
              {penaltyData.map((penalty) => (
                <li key={penalty.id}>
                  <span>{penalty.team} (</span>
                  <span>{penalty.time} - </span>
                  <span>{penalty.player} </span>
                  <span>{penalty.infraction})</span>
                  <span> {penalty.length}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*Game Details */}
        <div className="right-panel">
          <h3>Game Details</h3>
          <ul>
            <li>Venue: {venue}</li>
            <li>Attendance: 18,700</li>
            <li>Time: {time}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Games;
