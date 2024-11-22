import express from "express";
import {
  scrapeSchedule,
  scrapePlayerStats,
  scrapeStandings,
  scrapeGameDetails,
} from "../controllers/scraperController.js";

const router = express.Router();

router.get("/schedule", scrapeSchedule);
router.get("/player-stats", scrapePlayerStats);
router.get("/standings", scrapeStandings);
router.get("/game-details", scrapeGameDetails);

export default router;
