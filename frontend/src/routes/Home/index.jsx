import React, { useEffect, useState } from 'react';
import './index.css';
import InfoBox from './../../components/InfoBox';
import { ec2ip } from '../../utils/constants';
import { sortGames } from '../../utils/sortgames';
import { formatDateForCalendar } from '../../utils/sortgames';
import gameImage from './../../components/InfoBox/images/crown.png';

const Home = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [standingsData, setStandingsData] = useState([]); // For standings !!
  const nextGame = gamesData.length > 0 ? sortGames(gamesData).slice(0, 1) : [];

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`${ec2ip}/stats`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    const fetchGamesData = async () => {
      try {
        const response = await fetch(`${ec2ip}/games`);
        const data = await response.json();
        setGamesData(data); // Set gamesData with fetched data
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    // Standings spot reserved
    const fetchStandingsData = async () => {
      // New function to fetch standings data
      try {
        const response = await fetch(`${ec2ip}/standings`);
        const data = await response.json();
        setStandingsData(data); // Set standingsData with fetched data
      } catch (error) {
        console.error('Error fetching standings data:', error);
      }
    };

    fetchPlayerStats();
    fetchGamesData();
    fetchStandingsData();
  }, []);

  return (
    <div className="home-page">
      <div className="header-section">
        <h1>King's Hockey Team</h1>
        <h4>Winter 2024 - 2025</h4>
        <h4>Division 9</h4>
      </div>

      <div className="next-game-section">
        <div className="table-button-wrapper">
          <div className="text-container">
            <h3>Upcoming Game</h3>
            <p>Upcoming games for Kings</p>
          </div>
          {nextGame.length > 0 && (
            <a
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                nextGame[0].home_team + ' vs ' + nextGame[0].away_team
              )}&dates=${encodeURIComponent(
                formatDateForCalendar(nextGame[0].date) // Properly formatted date string
              )}&details=Game%20Location:%20${encodeURIComponent(
                nextGame[0].location + ' - ' + nextGame[0].rink + ' (Time: ' + '10:15 PM' + ')'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="add-to-calendar-button"
            >
              Add to Calendar
            </a>
          )}
        </div>
        <div className="table-container">
          {/* Image Section */}
          <div className="image-container">
            <img src={gameImage} alt="Game Image" />
          </div>

          {/* Table Section */}
          {nextGame.length > 0 ? (
            <table className="next-game-table">
              <tbody>
                {nextGame.map((game, index) => (
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
          ) : (
            <p>No upcoming game available.</p>
          )}
        </div>

        <hr className="section-divider" />
      </div>

      <div className="content-section">
        <InfoBox
          title="King's Top Player Stats"
          description="Top 7 Player Stats"
          players={playerStats} // Pass the playerStats as a prop
        />
        <InfoBox
          title="Standings"
          description="Current standings for Division 8"
          standings={standingsData} // Display only the top 2 upcoming games
        />
      </div>
    </div>
  );
};

export default Home;
