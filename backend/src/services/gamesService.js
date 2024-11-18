import prisma from "../utils/db.js";

export const getAllGames = async () => {
  return await prisma.games.findMany();
};

export const getGameById = async (id) => {
  return await prisma.games.findUnique({
    where: { id: Number(id) },
  });
};

export const createGame = async (gameData) => {
  try {
    return await prisma.games.create({
      data: gameData,
    });
  } catch (error) {
    console.error(`Unique constraint failed for game on: ${gameData.date}`);
  }
};

export const updateGame = async (date, gameData) => {
  return await prisma.games.upsert({
    where: { date: String(date) },
    update: gameData,
    create: gameData,
  });
};

export const deleteGame = async (id) => {
  return await prisma.games.delete({
    where: { id: Number(id) },
  });
};
