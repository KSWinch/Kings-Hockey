import {
  createGoal,
  getGoalByGameId,
  update_goal,
} from "../services/goalService.js";

export const getGoals = async (req, res) => {
  try {
    const { gameId } = req.params;
    const goals = await getGoalByGameId(gameId);
    if (!goals || goals.length === 0) {
      return res.json([]);
    }
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const addGoal = async (req, res) => {
  try {
    const goalData = req.body;
    if (!goalData.gameId) {
      return res
        .status(400)
        .json({ error: "Missing required fields: game_id" });
    }
    const goal = await createGoal(goalData);
    res.status(201).json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateGoal = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const goalData = req.body;
    const updatedGoal = await update_goal(gameId, goalData);
    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};
