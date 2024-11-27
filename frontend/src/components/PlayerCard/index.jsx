import React, { useState } from 'react';
import styles from './index.module.scss';
const PlayerCard = ({ name, position, photo, teamLogo, stats }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  console.log(stats);
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
