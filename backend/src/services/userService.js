import prisma from "../utils/db.js";

export const getAllUsers = async () => {
  return await prisma.users.findMany();
};

export const getUserById = async (id) => {
  return await prisma.users.findUnique({
    where: { id: Number(id) },
  });
};

export const createUser = async (userData) => {
  return await prisma.users.create({
    data: userData,
  });
};

export const updateUser = async (id, userData) => {
  return await prisma.users.update({
    where: { id: Number(id) },
    data: userData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.users.delete({
    where: { id: Number(id) },
  });
};
