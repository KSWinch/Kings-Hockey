import express from "express";
import {
  getAllStats,
  getStatById,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getAllStats);
router.get("/:id", getStatById);
router.post("/", createStat);
router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

export default router;
