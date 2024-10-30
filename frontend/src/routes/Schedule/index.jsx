import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Schedule = () => {
  const [gamesData, setGamesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch("http://localhost:8080/getSchedule");
        const data = await response.json();
        setGamesData(data);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchGamesData();
  }, []);

  const handleRowClick = (game) => {
    navigate(`/schedule/attendance/${game.id}`, { state: { game } });
  };
  return (
    <div className="table-container">
      <table className="game-table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {gamesData.map((game, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
              onClick={() => handleRowClick(game)}
              style={{ cursor: "pointer" }}
            >
              <td>{game.homeTeam}</td>
              <td>{game.awayTeam}</td>
              <td>{game.date}</td>
              <td>{game.time}</td>
              <td>{`${game.location} - ${game.rink}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
