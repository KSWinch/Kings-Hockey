import { expect, test } from "vitest";
import {
  scrapeSchedule,
  scrapeStandings,
} from "../../src/controllers/scraperController.js";
import { expect, test, vi } from "vitest";
import { scrapePlayerStats } from "../../src/controllers/scraperController.js";

test("scraperStandings return proper team names test", async () => {
  const req = {};
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();

  await scrapeStandings(req, res, next);

  const standingsResults = jsonMock.mock.calls[0][0];

  const extractedTeamNames = standingsResults.map((team) => team.team);

  // Define the expected team names
  const expectedTeamNames = [
    "Dump and Chase",
    "Vikings Hockey",
    "Kings",
    "The Shlebs",
    "Suihkukoneet HC",
    "Puck Fondlers",
    "Ottawa Spartans",
    "Mattamy Homes",
  ];

  expect(extractedTeamNames).toEqual(expectedTeamNames);
});

test("scrapePlayerStats return proper player names test", async () => {
  const req = {};
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();
  //
  await scrapePlayerStats(req, res, next);

  const playerStatsResults = jsonMock.mock.calls[0][0];

  const extractedPlayerNames = playerStatsResults.map((player) => player.name);

  const expectedPlayerNames = [
    "Cody Hermann",
    "Andrew Feniak",
    "Donald Sincennes",
    "Ryan Vanbruinessen",
    "Dave Feniak",
    "James Feniak",
    "Mo Njau",
    "Dom Heallis",
    "Gavin Tai",
    "Keith Zhang",
    "Mike Divins",
    "Kyle Winch",
    "Brandon Crosby",
    "Shawn Du",
    "Angus Leung",
  ];

  expect(expectedPlayerNames).toEqual(extractedPlayerNames);
});

test("Scrape Schedule ID to not return nulls", async () => {
  const req = {};
  const jsonMock = vi.fn();
  const statusMock = vi.fn(() => ({ json: jsonMock }));
  const res = { status: statusMock };
  const next = vi.fn();

  await scrapeSchedule(req, res, next);

  const scheduleResults = jsonMock.mock.calls[0][0];

  const extractedSchedule = scheduleResults.map((game) => game.id);

  expect(extractedSchedule.some((item) => item === null)).toBe(false);
});
