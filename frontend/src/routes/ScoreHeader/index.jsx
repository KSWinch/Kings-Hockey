import React, { useState, useEffect } from 'react';
import { ec2ip } from '../../utils/constants';
import './index.scss';

const ScoreHeader = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch(`${ec2ip}/games`);
        const data = await response.json();
        const pastGames = data.filter((game) => new Date(game.date) < new Date());
        setGamesData(pastGames);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    fetchGamesData();
  }, []);

  return (
    <div className="score-header-page">
      <div className="score-header-table-container">
        <div className="score-header-game-cards-container">
          {gamesData.map((game, index) => {
            const homeTeamLost = game.home_score < game.away_score;
            const awayTeamLost = game.away_score < game.home_score;

            return (
              <div className={`score-header-game-card ${index % 2 === 0 ? 'odd-row' : 'even-row'}`} key={game.id}>
                <div className="game-time">{game.date}</div>
                <div className={`team ${homeTeamLost ? 'lost' : ''}`}>
                  {game.home_team === 'Kings' ? (
                    <img src="images/crown.png" alt={`${game.home_team} logo`} className="team-logo" />
                  ) : (
                    <img src="images/crhl-logo.png" alt={`${game.home_team} logo`} className="team-logo" />
                  )}
                  <span className="team-name">{game.home_team}</span>
                  <span className="team-score">{game.home_score}</span>
                </div>
                <div className={`team ${awayTeamLost ? 'lost' : ''}`}>
                  {game.away_team === 'Kings' ? (
                    <img src="images/crown.png" alt={`${game.away_team} logo`} className="team-logo" />
                  ) : (
                    <img src="images/crhl-logo.png" alt={`${game.away_team} logo`} className="team-logo" />
                  )}
                  <span className="team-name">{game.away_team}</span>
                  <span className="team-score">{game.away_score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreHeader;
