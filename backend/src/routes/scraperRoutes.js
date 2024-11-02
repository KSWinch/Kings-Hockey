import express from "express";
import {
  scrapeSchedule,
  scrapePlayerStats,
} from "../controllers/scraperController.js";

const router = express.Router();

router.get("/schedule", scrapeSchedule);
router.get("/player-stats", scrapePlayerStats);

export default router;
