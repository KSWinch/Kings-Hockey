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
  return await prisma.games.create({
    data: gameData,
  });
};

export const updateGame = async (id, gameData) => {
  return await prisma.games.update({
    where: { id: Number(id) },
    data: gameData,
  });
};

export const deleteGame = async (id) => {
  return await prisma.games.delete({
    where: { id: Number(id) },
  });
};
