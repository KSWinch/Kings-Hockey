import express from "express";
import { getGoals, updateGoal } from "../controllers/goalController.js";

const router = express.Router();

router.get("/:gameId", getGoals);
router.put("/:gameId", updateGoal);

export default router;
