import { getGameById } from "../../src/controllers/gamesController.js";
import { expect, test, vi } from "vitest";
import gameDetails from "../fixtures/gameDetails.js";

test("getGameById returns score and team name kings", async () => {
  const req = { params: { id: 979461 } };
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();

  await getGameById(req, res, next);

  const gameResults = jsonMock.mock.calls[0][0];
  expect(statusMock).toHaveBeenCalledWith(200);
  expect(gameResults).toEqual(gameDetails);
});
