import React, { useEffect, useState } from 'react';
import { ec2ip } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import crhlLogo from './images/crhl-logo.png';
import crownLogo from './images/crown.png';
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
          <div className="team away-team">
            <img src={away_team === 'Kings' ? crownLogo : crhlLogo} alt={`${away_team} logo`} className="team-logo" />
            <h2>{away_team}</h2>
          </div>
          <div className="score">
            <h2>
              {away_score} - {home_score}
            </h2>
          </div>
          <div className="team home-team">
            <h2>{home_team}</h2>
            <img src={home_team === 'Kings' ? crownLogo : crhlLogo} alt={`${home_team} logo`} className="team-logo" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="left-panel">
          {/* Scoring Summary */}
          <div className="scoring-summary">
            <h3>Scoring Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Time</th>
                  <th>Scorer</th>
                  <th>Assists</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {gameData.map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.team}</td>
                    <td>{goal.time}</td>
                    <td>{goal.scorer}</td>
                    <td>
                      {goal.assister_1}, {goal.assister_2}
                    </td>
                    <td>{goal.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Penalty Summary */}
          <div className="penalty-summary">
            <h3>Penalty Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Time</th>
                  <th>Player</th>
                  <th>Infraction</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {penaltyData.map((penalty) => (
                  <tr key={penalty.id}>
                    <td>{penalty.team}</td>
                    <td>{penalty.time}</td>
                    <td>{penalty.player}</td>
                    <td>{penalty.infraction}</td>
                    <td>{penalty.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Game Details */}
        <div className="right-panel">
          <div className="game-details">
            <h3>Game Details</h3>
            <table>
              <tbody>
                <tr>
                  <td>Venue</td>
                  <td>{venue}</td>
                </tr>
                <tr>
                  <td>Attendance</td>
                  <td>18,700</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{time}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
