import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const addUser = async (req, res) => {
  const userData = req.body;
  const user = await createUser(userData);
  res.status(201).json(user);
};

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const user = await updateUser(id, userData);
  res.json(user);
};

export const removeUser = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.status(204).send();
};
