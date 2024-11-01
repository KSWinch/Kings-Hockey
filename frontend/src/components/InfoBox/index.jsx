import React from 'react';
import './../InfoBox/index.css';

const InfoBox = ({ title, description, imageUrl, players, games }) => {
  const sortedPlayers = players ? [...players].sort((a, b) => b.points - a.points) : [];
  const sortedSchedule = games
    ? [...games].sort((a, b) => new Date(b.date + ' 2024') - new Date(a.date + ' 2024'))
    : [];

  console.log('Sorted Schedule:', sortedSchedule);
  return (
    <div className="post-card">
      <header className="post-card-header">
        <h2 className="post-card-title">{title}</h2>
      </header>
      <section className="post-card-excerpt">
        <p>{description}</p>
      </section>
      {players ? (
        <div className="player-stats-scroll">
          <table className="player-stats-mini-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Pos</th>
                <th>GP</th>
                <th>G</th>
                <th>A</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.slice(0, 3).map((player, index) => (
                <tr key={index}>
                  <td>{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.games_played}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                  <td>{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : games ? (
        <div className="upcoming-games-scroll">
          <table className="upcoming-games-mini-table">
            <thead>
              <tr>
                <th>Home</th>
                <th>Away</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {sortedSchedule.slice(0, 1).map((game, index) => (
                <tr key={index}>
                  <td>{game.home_team}</td>
                  <td>{game.away_team}</td>
                  <td>{game.date}</td>
                  <td>{game.time}</td>
                  <td>{`${game.location} - ${game.rink}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="post-card-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
    </div>
  );
};

export default InfoBox;
