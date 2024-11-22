import {
  createGoal,
  getGoalsByGameId,
  update_goal,
} from "../services/goalService.js";

export const getGoals = async (req, res) => {
  try {
    const { gameId } = req.params;
    const goals = await getGoalsByGameId(gameId);
    if (!goals || goals.length === 0) {
      return res.json([]);
    }
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateGoal = async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const goalData = req.body;
    const updatedGoal = await update_goal(goalId, goalData);
    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};
