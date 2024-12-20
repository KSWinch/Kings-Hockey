import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import PlayerCard from '../../components/PlayerCard';
import { ec2ip } from '../../utils/constants';
import { line_combination } from './helpers';
const stockImageUrl = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png';
const teamLogo = 'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png';

const Lineup = () => {
  const [playerStats, setPlayerStats] = useState([]);
  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`${ec2ip}/stats`);
        if (!response.ok) {
          throw new Error('Network response was not ok to fetch player stats');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };
    fetchPlayerStats();
  }, []);

  const getStatsForPlayer = useMemo(() => {
    return (playerName) => {
      return playerStats.find((player) => player.name === playerName);
    };
  }, [playerStats]);

  return (
    <div className={styles['lineup-page']}>
      {/* ------------- FORWARDS ----------------- */}
      <div className={styles['position-title']}>
        <h1>Forwards</h1>
      </div>
      <div className={styles['position-subtitle']}>
        <h2>LW</h2>
        <h2>C</h2>
        <h2>RW</h2>
      </div>
      {/* ------------- L1 ----------------- */}
      <div className={styles['card-line']}>
        {line_combination.line_1.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
      <hr className={styles['line-divider']} />
      {/* ------------- L2 ----------------- */}
      <div className={styles['card-line']}>
        {line_combination.line_2.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
      <hr className={styles['line-divider']} />
      {/* ------------- L3 ----------------- */}
      <div className={styles['card-line']}>
        {line_combination.line_3.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
      {/* ------------- DEFENSE ----------------- */}
      <div className={styles['position-title']}>
        <h1>Defensive Pairings</h1>
      </div>
      {/* ------------- D1 ----------------- */}
      <div className={`${styles['card-line']} ${styles['defensive-pairings']}`}>
        {line_combination.d1.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
      <hr className={styles['line-divider']} />
      {/* ------------- D2 ----------------- */}
      <div className={`${styles['card-line']} ${styles['defensive-pairings']}`}>
        {line_combination.d2.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
      {/* ------------- Goalie ----------------- */}
      <div className={styles['position-title']}>
        <h1>Goalie</h1>
      </div>
      <div className={`${styles['card-line']} ${styles['goalie']}`}>
        {line_combination.g.map((player) => {
          return (
            <PlayerCard
              height={player.height}
              hometown={player.hometown}
              name={player.name}
              photo={player.photo || stockImageUrl}
              position={player.position}
              teamLogo={teamLogo}
              stats={getStatsForPlayer(player.name)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Lineup;
