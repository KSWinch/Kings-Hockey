import * as standingsService from "../services/standingsService.js";

// Get all standings
export const getAllStandings = async (req, res, next) => {
  try {
    const standings = await standingsService.getAllStandings();
    res.status(200).json(standings);
  } catch (error) {
    next(error);
  }
};

// Get a single standing by ID
export const getStandingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const standing = await standingsService.getStandingById(id);
    if (!standing) {
      return res.status(404).json({ message: "Standing not found" });
    }
    res.status(200).json(standing);
  } catch (error) {
    next(error);
  }
};

// Create a new standing
export const createStanding = async (req, res, next) => {
  try {
    const standingData = req.body;
    const newStanding = await standingsService.createStanding(standingData);
    res.status(201).json(newStanding);
  } catch (error) {
    next(error);
  }
};

// Update a standing by ID
export const updateStanding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const standingData = req.body;
    const updatedStanding = await standingsService.updateStanding(
      id,
      standingData
    );
    if (!updatedStanding) {
      return res.status(404).json({ message: "Standing not found" });
    }
    res.status(200).json(updatedStanding);
  } catch (error) {
    next(error);
  }
};

// Delete a standing by ID
export const deleteStanding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStanding = await standingsService.deleteStanding(id);
    if (!deletedStanding) {
      return res.status(404).json({ message: "Standing not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
