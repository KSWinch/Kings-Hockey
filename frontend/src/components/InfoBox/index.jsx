// src/components/InfoBox.jsx
import React from 'react';
import './../InfoBox/index.css';

const InfoBox = ({ title, description, imageUrl, players }) => {
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
              {players.slice(0, 3).map((player, index) => (
                <tr key={index}>
                  <td>{player.jerseyNumber}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.gamesPlayed}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                  <td>{player.points}</td>
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
