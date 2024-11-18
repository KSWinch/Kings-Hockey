import React, { useState } from 'react';
import styles from './index.module.scss';
// import { ec2ip } from '../../utils/constants';
const PlayerCard = ({ name, position, photo, teamLogo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [playerStats, setPlayerStats] = useState({});
  // useEffect(() => {
  //   const fetchPlayerStats = async () => {
  //     try {
  //       const response = await fetch(`${ec2ip}/stats`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setPlayerStats(data);
  //     } catch (error) {
  //       console.error('Error fetching player stats:', error);
  //     }
  //   };

  //   fetchPlayerStats();
  // }, []);

  const handleCardClick = () => {
    console.log(playerStats);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${styles['player-card']} ${isFlipped ? styles['flipped'] : ''}`} onClick={handleCardClick}>
      <div className={styles['card-front']}>
        <div className={styles['card-name-bar']}>
          <img
            alt={`crhl_logo`}
            className={styles['league-logo']}
            src={'https://www.crhl.com/wp-content/themes/f5-main/images/header-logo.png'}
          />
          <div className={styles['card-name-container']}>
            <p className={styles['card-position']}>{position}</p>
            <h1 className={styles['card-name']}>{name}</h1>
          </div>
          <div className={styles['logo-container']}>
            <img src={teamLogo} className={styles['card-team-logo']} alt={`kings-logo`} />
          </div>
        </div>
        <div className={styles['player-img']}>
          <img src={photo} alt={`${name}_card`} />
        </div>
      </div>
      <div className={styles['card-back']}></div>
    </div>
  );
};

export default PlayerCard;
