import prisma from "../utils/db.js";

export const getGoalsByGameId = async (gameId) => {
  return await prisma.goal.findMany({
    where: { game_id: Number(gameId) },
    orderBy: [
      {
        period: "asc",
      },
      {
        time: "desc",
      },
    ],
  });
};

export const getAllGoals = async () => {
  return await prisma.goal.findMany();
};

export const createGoal = async (goalData) => {
  try {
    return await prisma.goal.create({
      data: goalData,
    });
  } catch (error) {
    console.error(error);
  }
};

export const update_goal = async (goalId, goalData) => {
  return await prisma.goal.upsert({
    where: { id: String(goalId) },
    update: goalData,
    create: goalData,
  });
};
