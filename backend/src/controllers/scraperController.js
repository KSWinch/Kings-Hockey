import WebScraperService from "../services/scraperService.js";
import * as gamesService from "../services/gamesService.js";
import * as statsService from "../services/statsService.js";

export async function scrapeSchedule(req, res, next) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );

  try {
    await scraper.initializeWebScraper();
    const gamesData = await scraper.getSchedule();
    gamesData.forEach(async (game) => {
      const gameData = {
        away_team: game.awayTeam,
        date: game.date,
        home_team: game.homeTeam,
        location: game.location,
        rink: game.rink,
        time: game.time,
      };
      await gamesService.createGame(gameData);
    });

    res.status(200).json(gamesData);
  } catch (error) {
    next(error);
    console.error(error);
  }
}

export async function scrapePlayerStats(req, res, next) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/team/465723"
  );

  try {
    await scraper.initializeWebScraper();
    const playerStats = await scraper.getPlayerStats();
    playerStats.forEach(async (stats) => {
      const playerStat = {
        jersey_number: stats.jerseyNumber,
        name: stats.name,
        position: stats.position,
        games_played: stats.gamesPlayed,
        goals: stats.goals,
        assists: stats.assists,
        points: stats.points,
        points_per_game: stats.pointsPerGame,
        penalty_minutes: stats.penaltyMinutes,
        power_play_goals: stats.powerPlayGoals,
        short_handed_goals: stats.shortHandedGoals,
        game_winning_goals: stats.gameWinningGoals,
      };
      await statsService.createStat(playerStat);
    });
    res.status(200).json(playerStats);
  } catch (error) {
    next(error);
    console.error(error);
  }
}
