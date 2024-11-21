import express from "express";
import {
  addGoal,
  getGoals,
  updateGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.get("/:gameId", getGoals);
router.post("/", addGoal);
router.put("/:gameId", updateGoal);

export default router;
