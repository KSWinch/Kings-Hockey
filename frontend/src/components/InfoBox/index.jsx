import React from 'react';
import './../InfoBox/index.css';

const InfoBox = ({ title, description, imageUrl, players, games, standings }) => {
  const sortedPlayers = players ? [...players].sort((a, b) => b.points - a.points) : [];
  const sortedSchedule = games
    ? [...games]
        .filter((game) => {
          const gameDate = new Date(game.date + ' 2025');
          return gameDate >= new Date('2025-01-01') && gameDate <= new Date('2025-06-30') && gameDate >= new Date();
        })
        .sort((a, b) => new Date(a.date + ' 2025') - new Date(b.date + ' 2025'))
    : [];
  const sortedStandings = standings ? [...standings].sort((a, b) => a.rank - b.rank) : [];
  console.log(new Date());

  return (
    <div className="post-card">
      <header className="post-card-header">
        <h2 className="post-card-title">{title}</h2>
      </header>
      <section className="post-card-excerpt">
        <p>{description}</p>
      </section>
      {players ? (
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
            {sortedPlayers.slice(0, 7).map((player, index) => (
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
      ) : games ? (
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
      ) : standings ? (
        <table className="standings-mini-table">
          <thead>
            <tr>
              <th>Rk</th>
              <th>Team</th>
              <th>GP</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>OT</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedStandings.map((team, index) => (
              <tr key={index}>
                <td>{team.rank}</td>
                <td>{team.team}</td>
                <td>{team.games_played}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{team.ties}</td>
                <td>{team.overtime_losses}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="post-card-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
    </div>
  );
};

export default InfoBox;
