import React, { useEffect, useState } from 'react';
import './index.scss';
import { ec2ip } from '../../utils/constants';

const Scores = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch(`${ec2ip}/games`);
        const data = await response.json();
        const pastGames = data.sort((a, b) => a.id - b.id);
        setGamesData(pastGames);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    fetchGamesData();
  }, []);

  return (
    <div className="scores-page">
      <div className="scores-table-container">
        <div className="scores-game-cards-container">
          <div className="scores-table-header">Scores</div>
          {gamesData.map((game, index) => (
            <div className={`scores-game-card ${index % 2 === 0 ? 'odd-row' : 'even-row'}`} key={game.id}>
              <div className="game-time">{game.date}</div>
              <div className={parseInt(game.home_score) > parseInt(game.away_score) ? 'team' : 'team-loss'}>
                {game.home_team === 'Kings' ? (
                  <img src="images/crown.png" alt={`${game.home_team} logo`} className="team-logo" />
                ) : (
                  <img src="images/crhl-logo.png" alt={`${game.home_team} logo`} className="team-logo" />
                )}
                <span className="team-name">{game.home_team}</span>
                <span className="team-score">{game.home_score}</span>
              </div>
              <div className={parseInt(game.away_score) > parseInt(game.home_score) ? 'team' : 'team-loss'}>
                {game.away_team === 'Kings' ? (
                  <img src="images/crown.png" alt={`${game.away_team} logo`} className="team-logo" />
                ) : (
                  <img src="images/crhl-logo.png" alt={`${game.away_team} logo`} className="team-logo" />
                )}
                <span className="team-name">{game.away_team}</span>
                <span className="team-score">{game.away_score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
