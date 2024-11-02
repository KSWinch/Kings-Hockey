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
  return await prisma.stats.create({
    data: userData,
  });
};

export const updateStat = async (id, userData) => {
  return await prisma.stats.update({
    where: { id: Number(id) },
    data: userData,
  });
};

export const deleteStat = async (id) => {
  return await prisma.stats.delete({
    where: { id: Number(id) },
  });
};
