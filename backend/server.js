import express from "express";
import WebScraperService from "./webscraper.js";
import cors from "cors";
import {
  insertGameData,
  fetchGameData,
  insertStatsData,
  fetchStatsData,
} from "./database.js";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/scrapeSchedule", async (req, res) => {
  try {
    const webscraper = new WebScraperService(
      "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
    );
    await webscraper.initializeWebScraper();
    const scrapedData = await webscraper.getElement();

    await insertGameData(scrapedData);
    res.json(scrapedData);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    res.status(500).json({ error: "Failed to fetch schedule data" });
  }
});

app.get("/scrapeStats", async (req, res) => {
  try {
    const webscraper = new WebScraperService(
      "https://crhl.hockeyshift.com/stats#/489/team/465723"
    );
    await webscraper.initializeWebScraper();
    const scrapedData = await webscraper.getPlayerStats();

    await insertStatsData(scrapedData);
    res.json(scrapedData);
  } catch (error) {
    console.error("Error fetching stats data:", error);
    res.status(500).json({ error: "Failed to fetch stats data" });
  }
});

app.get("/getSchedule", async (req, res) => {
  try {
    const gameData = await fetchGameData();
    res.json(gameData);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    res.status(500).json({ error: "Failed to fetch schedule data" });
  }
});

app.get("/getStats", async (req, res) => {
  try {
    const gameData = await fetchStatsData();
    res.json(gameData);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    res.status(500).json({ error: "Failed to fetch schedule data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
