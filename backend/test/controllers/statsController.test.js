import { getAllStats } from "../../src/controllers/statsController.js";
import { expect, test, vi } from "vitest";
import statsDetails from "../fixtures/statsDetails.js";

test("getAllStats returns players with positions", async () => {
  const req = {};
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();

  await getAllStats(req, res, next);

  const statsResults = jsonMock.mock.calls[0][0];
  expect(statusMock).toHaveBeenCalledWith(200);

  expect(statsResults).toHaveLength(statsDetails.length);

  statsResults.forEach((player, index) => {
    expect(player).not.toBeUndefined();
    expect(player.position).not.toBeNull();

    expect(player).toHaveProperty("position");
    expect(player.position).toEqual(statsDetails[index].position);
  });
});
