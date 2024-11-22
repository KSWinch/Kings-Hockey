import prisma from "../utils/db.js";

export const getPenaltiesByGameId = async (gameId) => {
  return await prisma.penalty.findMany({
    where: { game_id: Number(gameId) },
  });
};

export const update_penalty = async (penaltyId, penaltyData) => {
  return await prisma.penalty.upsert({
    where: { id: String(penaltyId) },
    update: penaltyData,
    create: penaltyData,
  });
};
