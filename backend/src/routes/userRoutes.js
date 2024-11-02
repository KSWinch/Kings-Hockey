import express from "express";
import {
  getUsers,
  getUser,
  addUser,
  updateUserDetails,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUserDetails);
router.delete("/:id", removeUser);

export default router;
