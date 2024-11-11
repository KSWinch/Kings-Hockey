import * as statsService from "../services/statsService.js";

// Get all stats
export const getAllStats = async (req, res, next) => {
  try {
    const stats = await statsService.getAllStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// Get a single stat by ID
export const getStatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stat = await statsService.getStatById(id);
    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.status(200).json(stat);
  } catch (error) {
    next(error);
  }
};

// Create a new stat
export const createStat = async (req, res, next) => {
  try {
    const userData = req.body;
    const newStat = await statsService.createStat(userData);
    res.status(201).json(newStat);
  } catch (error) {
    next(error);
  }
};

// Update a stat by ID
export const updateStat = async (req, res, next) => {
  try {
    const { jersey_number } = req.params;
    const userData = req.body;
    const updatedStat = await statsService.updateStat(jersey_number, userData);
    if (!updatedStat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.status(200).json(updatedStat);
  } catch (error) {
    next(error);
  }
};

// Delete a stat by ID
export const deleteStat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStat = await statsService.deleteStat(id);
    if (!deletedStat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
