import WebScraperService from "../services/scraperService.js";
import * as gamesService from "../services/gamesService.js";

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

export async function scrapePlayerStats(req, res) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/team/465723"
  );

  try {
    await scraper.initializeWebScraper();
    const playerStats = await scraper.getPlayerStats();
    res.status(200).json(playerStats);
  } catch (error) {
    console.error(error);
  }
}
