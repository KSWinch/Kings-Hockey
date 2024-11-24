import React from 'react';
import styles from './index.module.scss';
import PlayerCard from '../../components/PlayerCard';
import AngusPhoto from '../../assets/images/angus_card_photo.JPEG';
// import GavinPhoto from '../../assets/images/gav-sens-photo.jpg';

const stockImageUrl = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png';
const teamLogo = 'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png';
const Lineup = () => {
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
      <div className={styles['card-line']}>
        <PlayerCard name="Andrew Feniak" photo={stockImageUrl} position="LW" teamLogo={teamLogo} />
        <PlayerCard name="Cody Hermann" photo={stockImageUrl} position="C" teamLogo={teamLogo} />
        <PlayerCard name="Morille Njau" photo={stockImageUrl} position="RW" teamLogo={teamLogo} />
      </div>
      <hr className={styles['line-divider']} />
      <div className={styles['card-line']}>
        <PlayerCard name="Dom Heallis" photo={stockImageUrl} position="LW" teamLogo={teamLogo} />
        <PlayerCard name="James Feniak" photo={stockImageUrl} position="C" teamLogo={teamLogo} />
        <PlayerCard name="Gavin Tai" photo={stockImageUrl} position="RW" teamLogo={teamLogo} />
      </div>
      <hr className={styles['line-divider']} />
      <div className={styles['card-line']}>
        <PlayerCard name="Xiaoyu Du" photo={stockImageUrl} position="LW" teamLogo={teamLogo} />
        <PlayerCard name="Donald Sincennes" photo={stockImageUrl} position="C" teamLogo={teamLogo} />
        <PlayerCard name="Angus Leung" photo={AngusPhoto} position="RW" teamLogo={teamLogo} />
      </div>
      {/* ------------- DEFENSE ----------------- */}
      <div className={styles['position-title']}>
        <h1>Defensive Pairings</h1>
      </div>
      <div className={`${styles['card-line']} ${styles['defensive-pairings']}`}>
        <PlayerCard name="Mike Divs" photo={stockImageUrl} position="D" teamLogo={teamLogo} />
        <PlayerCard name="Keith Zhang" photo={stockImageUrl} position="D" teamLogo={teamLogo} />
      </div>
      <hr className={styles['line-divider']} />
      <div className={`${styles['card-line']} ${styles['defensive-pairings']}`}>
        <PlayerCard name="David Feniak" photo={stockImageUrl} position="D" teamLogo={teamLogo} />
        <PlayerCard name="Brandon Crosby" photo={stockImageUrl} position="D" teamLogo={teamLogo} />
      </div>
      {/* ------------- Goalie ----------------- */}
      <div className={styles['position-title']}>
        <h1>Goalie</h1>
      </div>
      <div className={`${styles['card-line']} ${styles['goalie']}`}>
        <PlayerCard name="Freedo Layy" photo={stockImageUrl} position="G" teamLogo={teamLogo} />
      </div>
    </div>
  );
};

export default Lineup;
