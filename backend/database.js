import mysql from "mysql2/promise";
import dbConfig from "./dbConfig.js";

export const insertGameData = async (gameData) => {
  const connection = await mysql.createConnection(dbConfig);

  const insertQuery = `
  INSERT IGNORE INTO Games (home_team, away_team, location, date, time, rink) 
  VALUES (?, ?, ?, ?, ?, ?)
`;

  const promises = gameData.map(async (game) => {
    const values = [
      game.homeTeam,
      game.awayTeam,
      game.location,
      game.date,
      game.time,
      game.rink,
    ];
    await connection.execute(insertQuery, values);
  });

  await Promise.all(promises);
  await connection.end();
};

export const fetchGameData = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM Games");
  await connection.end();
  return rows;
};
