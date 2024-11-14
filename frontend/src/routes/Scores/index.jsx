import React, { useEffect, useState } from 'react';
import './index.css';

const Scores = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch('http://54.234.144.204:8080/games');
        const data = await response.json();
        const todaysDate = new Date();
        const pastGames = data
          .filter(game => new Date(game.date + ' 2024 23:59:59') <= todaysDate)
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
          {gamesData.map((game, index) => (
            <div className={`scores-game-card ${index % 2 === 0 ? 'odd-row' : 'even-row'}`} key={game.id}>
              <div className="game-time">
                {game.date} - {game.time}
              </div>
              <div className="teams">
                <div className="team">
                  {game.home_team === "Kings" ? (
                    <img src="images/crown.png" alt={`${game.home_team} logo`} className="team-logo" />
                  ) : (
                    <img src="images/crhl-logo.png" alt={`${game.home_team} logo`} className="team-logo" />
                  )}
                  <div>{game.home_team}</div>
                </div>
                <div>@</div>
                <div className="team">
                  {game.away_team === "Kings" ? (
                    <img src="images/crown.png" alt={`${game.away_team} logo`} className="team-logo" />
                  ) : (
                    <img src="images/crhl-logo.png" alt={`${game.away_team} logo`} className="team-logo" />
                  )}
                  <div>{game.away_team}</div>
                </div>
              </div>
              <div className="additional-info">
                {game.location} - {game.rink}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
