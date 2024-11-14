import prisma from "../utils/db.js";

export const getAllStats = async () => {
  return await prisma.stats.findMany();
};

export const getStatById = async (id) => {
  return await prisma.stats.findUnique({
    where: { id: Number(id) },
  });
};

export const createStat = async (userData) => {
  try {
    return await prisma.stats.create({
      data: userData,
    });
  } catch (error) {
    console.error(`Unique constraint failed for player: ${userData.name}`);
  }
};

export const updateStat = async (jersey_number, userData) => {
  return await prisma.stats.upsert({
    where: { jersey_number: Number(jersey_number) },
    update: userData,
    create: userData,
  });
};

export const deleteStat = async (id) => {
  return await prisma.stats.delete({
    where: { id: Number(id) },
  });
};
