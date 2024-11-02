import express from "express";
import {
  scrapeSchedule,
  scrapePlayerStats,
  scrapeStandings,
} from "../controllers/scraperController.js";

const router = express.Router();

router.get("/schedule", scrapeSchedule);
router.get("/player-stats", scrapePlayerStats);
router.get("/standings", scrapeStandings);

export default router;
