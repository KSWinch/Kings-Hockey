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

export const fetchStatsData = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM Stats");
  await connection.end();
  return rows;
};

export const insertStatsData = async (statsData) => {
  const connection = await mysql.createConnection(dbConfig);

  const insertQuery = `
    INSERT INTO Stats (jersey_number, name, position, games_played, goals, assists, points, points_per_game, penalty_minutes, power_play_goals, short_handed_goals, game_winning_goals) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      position = VALUES(position),
      games_played = VALUES(games_played),
      goals = VALUES(goals),
      assists = VALUES(assists),
      points = VALUES(points),
      points_per_game = VALUES(points_per_game),
      penalty_minutes = VALUES(penalty_minutes),
      power_play_goals = VALUES(power_play_goals),
      short_handed_goals = VALUES(short_handed_goals),
      game_winning_goals = VALUES(game_winning_goals)
  `;

  const promises = statsData.map(async (stats) => {
    const values = [
      stats.jerseyNumber,
      stats.name,
      stats.position,
      stats.gamesPlayed,
      stats.goals,
      stats.assists,
      stats.points,
      stats.pointsPerGame,
      stats.penaltyMinutes,
      stats.powerPlayGoals,
      stats.shortHandedGoals,
      stats.gameWinningGoals,
    ];
    await connection.execute(insertQuery, values);
  });

  await Promise.all(promises);
  await connection.end();
};
