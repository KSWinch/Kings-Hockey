import WebScraperService from "../services/scraperService.js";

export async function scrapeSchedule(req, res) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );

  try {
    await scraper.initializeWebScraper();
    const scheduleData = await scraper.getSchedule();
    res.status(200).json(scheduleData);
  } catch (error) {
    next(error);
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
    next(error);
  }
}
