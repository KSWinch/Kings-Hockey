import React from 'react';
import styles from './index.module.scss';
import PlayerCard from '../../components/PlayerCard';
import AngusPhoto from '../../assets/images/angus_card_photo.JPEG';
import GavinPhoto from '../../assets/images/gav-sens-photo.jpg';

const Lineup = () => {
  return (
    <div className={styles['lineup-page']}>
      <div className={styles['card-line']}>
        <p className={styles['title']}>WIP</p>
        <PlayerCard
          name="Angus Leung"
          photo={AngusPhoto}
          position="LW"
          teamLogo={'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png'}
        />
        <PlayerCard
          name="Gavin Tai"
          photo={GavinPhoto}
          position="LW"
          teamLogo={'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png'}
        />
        <PlayerCard
          name="Gavin Tai"
          photo={GavinPhoto}
          position="LW"
          teamLogo={'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png'}
        />
        <PlayerCard
          name="Gavin Tai"
          photo={GavinPhoto}
          position="LW"
          teamLogo={'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png'}
        />
        <PlayerCard
          name="Gavin Tai"
          photo={GavinPhoto}
          position="LW"
          teamLogo={'https://i.pinimg.com/originals/e1/b4/cb/e1b4cb36a5f699416d31c67e5210077d.png'}
        />
      </div>
    </div>
  );
};

export default Lineup;
