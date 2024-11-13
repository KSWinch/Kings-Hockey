import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Schedule = () => {
  const [gamesData, setGamesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch('http://54.234.144.204:8080/games');
        const data = await response.json();
        data.sort((a, b) => new Date(a.date + ' 2024') - new Date(b.date + ' 2024'));
        setGamesData(data);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    fetchGamesData();
  }, []);

  const handleRowClick = (game) => {
    navigate(`/schedule/attendance/${game.id}`, { state: { game } });
  };

  return (
    <div className="schedule-page">
      <div className="table-container">
        <div className="table-responsive-wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Home Team</TableCell>
                  <TableCell align="center">Away Team</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Rink</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamesData.map((game, index) => (
                  <TableRow
                    key={game.id}
                    className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                    onClick={() => handleRowClick(game)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{game.home_team}</TableCell>
                    <TableCell align="center">{game.away_team}</TableCell>
                    <TableCell align="center">{game.date}</TableCell>
                    <TableCell align="center">{game.time}</TableCell>
                    <TableCell align="center">{game.location}</TableCell>
                    <TableCell align="center">{game.rink}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="game-cards-container">
          {gamesData.map((game, index) => (
            <div className={`game-card ${index % 2 === 0 ? 'even-row' : 'odd-row'}`} key={game.id}>
              <div className="game-time">
                {game.date} - {game.time}
              </div>
              <div className="teams">
                <div className="team">
                  <img src="/favicon.ico" alt={`${game.home_team} logo`} className="team-logo" />
                  <div>{game.home_team}</div>
                  <div>{game.home_odds}</div>
                </div>
                <div>@</div>
                <div className="team">
                  <img src="/favicon.ico" alt={`${game.away_team} logo`} className="team-logo" />
                  <div>{game.away_team}</div>
                  <div>{game.away_odds}</div>
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
