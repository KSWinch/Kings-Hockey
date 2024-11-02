import * as gamesService from "../services/gamesService.js";

// Get all games
export const getAllGames = async (req, res, next) => {
  try {
    const games = await gamesService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

// Get a single game by ID
export const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await gamesService.getGameById(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

// Create a new game
export const createGame = async (req, res, next) => {
  try {
    const gameData = req.body;
    const newGame = await gamesService.createGame(gameData);
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// Update a game by ID
export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameData = req.body;
    const updatedGame = await gamesService.updateGame(id, gameData);
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

// Delete a game by ID
export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGame = await gamesService.deleteGame(id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
