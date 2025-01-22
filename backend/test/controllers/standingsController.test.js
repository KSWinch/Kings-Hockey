import { getAllStandings } from "../../src/controllers/standingsController.js";
import { expect, test, vi } from "vitest";
import standingsDetails from "../fixtures/standingsDetails.js";

test("getAllStandings returns standings with team names", async () => {
  const req = {};
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();

  await getAllStandings(req, res, next);

  const standingsResults = jsonMock.mock.calls[0][0];
  expect(statusMock).toHaveBeenCalledWith(200);

  // Ensures both arrays have the same number of elements
  expect(standingsResults).toHaveLength(standingsDetails.length);

  // Compare each team's data in standingsResults with standingsDetails
  standingsResults.forEach((team, index) => {
    expect(team).not.toBeNull();
    expect(team).not.toBeUndefined();

    // Verify the team object contains the expected properties
    expect(team).toHaveProperty("team");
    expect(team.team).toEqual(standingsDetails[index].team);
  });
});
