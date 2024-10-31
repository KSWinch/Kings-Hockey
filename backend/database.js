import mysql from "mysql2/promise"; // Import mysql2
import dbConfig from "./dbConfig.js"; // Import the database configuration

// Function to insert game data into the database
export const insertGameData = async (gameData) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
  } catch (error) {
    console.error("errror: ", error.message);
  }
  const insertQuery = `
    INSERT INTO Schedule (homeTeam, awayTeam, location, date, time) 
    VALUES (?, ?, ?, ?, ?)`;

  const promises = gameData.map(async (game) => {
    const values = [
      game.homeTeam,
      game.awayTeam,
      game.location,
      game.date,
      game.time,
    ];
    await connection.execute(insertQuery, values);
  });

  await Promise.all(promises);
  await connection.end();
};
