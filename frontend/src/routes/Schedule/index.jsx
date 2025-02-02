import React, { useEffect, useState } from 'react';
import './index.scss';
import { ec2ip } from '../../utils/constants';

const Schedule = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch(`${ec2ip}/games`);
        const data = await response.json();
        const upcomingGames = data.sort((a, b) => a.id - b.id);
        setGamesData(upcomingGames);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    fetchGamesData();
  }, []);

  return (
    <div className="schedule-page">
      <div className="schedule-table-container">
        <div className="game-cards-container">
          <div className="schedule-table-header">Schedule</div>
          {gamesData.map((game, index) => (
            <div className={`game-card ${index % 2 === 0 ? 'odd-row' : 'even-row'}`} key={game.id}>
              <div className="game-time">
                {game.date} - {game.time}
              </div>
              <div className="teams">
                <div className="team">
                  {game.home_team === 'Kings' ? (
                    <img src="images/crown.png" alt={`${game.home_team} logo`} className="team-logo" />
                  ) : (
                    <img src="images/crhl-logo.png" alt={`${game.home_team} logo`} className="team-logo" />
                  )}
                  <div>{game.home_team}</div>
                </div>
                <div>@</div>
                <div className="team">
                  {game.away_team === 'Kings' ? (
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

export default Schedule;
