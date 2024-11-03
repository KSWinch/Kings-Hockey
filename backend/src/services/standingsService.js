import prisma from "../utils/db.js";

export const getAllStandings = async () => {
  return await prisma.standings.findMany();
};

export const getStandingById = async (id) => {
  return await prisma.standings.findUnique({
    where: { id: Number(id) },
  });
};

export const createStanding = async (standingData) => {
  try {
    return await prisma.standings.create({
      data: standingData,
    });
  } catch (error) {
    console.error(
      `Unique constraint failed for standing on: ${standingData.date}`
    );
  }
};

export const updateStanding = async (id, standingData) => {
  return await prisma.standings.update({
    where: { id: Number(id) },
    data: standingData,
  });
};

export const deleteStanding = async (id) => {
  return await prisma.standings.delete({
    where: { id: Number(id) },
  });
};
