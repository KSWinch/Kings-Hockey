import express from "express";
import {
  getPenalties,
  updatePenalty,
} from "../controllers/penaltyController.js";

const router = express.Router();

router.get("/:gameId", getPenalties);
router.put("/:penaltyId", updatePenalty);

export default router;
