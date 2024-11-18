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
        const todaysDate = new Date();
        const pastGames = data
          .filter((game) => new Date(game.date + ' 2024 23:59:59') <= todaysDate)
          .sort((a, b) => new Date(a.date + ' 2024') - new Date(b.date + ' 2024'));
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
          {gamesData.map((game, index) => {
            const isKingsHome = game.home_team === 'Kings';

            const kingsScore = isKingsHome ? game.home_score : game.away_score;
            const opponentScore = isKingsHome ? game.away_score : game.home_score;

            const isKingsWin = kingsScore > opponentScore;
            const resultText = isKingsWin ? 'Win' : 'Loss';
            const resultClass = isKingsWin ? 'win' : 'loss';

            return (
              <div className={`scores-game-card ${index % 2 === 0 ? 'odd-row' : 'even-row'}`} key={game.id}>
                <div className="game-time">{game.date}</div>

                <div className="team">
                  {isKingsHome ? (
                    <>
                      <img src="images/crown.png" alt="Kings logo" className="team-logo" />
                      <span className="team-name">{game.home_team}</span>
                      <span className="team-score">{game.home_score}</span>
                    </>
                  ) : (
                    <>
                      <img src="images/crhl-logo.png" alt={`${game.home_team} logo`} className="team-logo" />
                      <span className="team-name">{game.home_team}</span>
                      <span className="team-score">{game.home_score}</span>
                    </>
                  )}
                </div>

                <div className="team">
                  {!isKingsHome ? (
                    <>
                      <img src="images/crown.png" alt="Kings logo" className="team-logo" />
                      <span className="team-name">{game.away_team}</span>
                      <span className="team-score">{game.away_score}</span>
                    </>
                  ) : (
                    <>
                      <img src="images/crhl-logo.png" alt={`${game.away_team} logo`} className="team-logo" />
                      <span className="team-name">{game.away_team}</span>
                      <span className="team-score">{game.away_score}</span>
                    </>
                  )}
                </div>

                {/* Display Win/Loss result at the bottom middle */}
                <div className="game-result">
                  <span className={`result-text ${resultClass}`}>{resultText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scores;