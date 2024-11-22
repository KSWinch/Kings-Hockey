import {
  getPenaltiesByGameId,
  update_penalty,
} from "../services/penaltyService.js";

export const getPenalties = async (req, res) => {
  try {
    const { gameId } = req.params;
    const penalties = await getPenaltiesByGameId(gameId);
    if (!penalties || penalties.length === 0) {
      return res.json([]);
    }
    res.json(penalties);
  } catch (error) {
    console.error("Error fetching penalties:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updatePenalty = async (req, res, next) => {
  try {
    const { penaltyId } = req.params;
    const penaltyData = req.body;
    const updatedPenalty = await update_penalty(penaltyId, penaltyData);
    if (!updatedPenalty) {
      return res.status(404).json({ message: "Penalty not found" });
    }
    res.status(200).json(updatedPenalty);
  } catch (error) {
    next(error);
  }
};
