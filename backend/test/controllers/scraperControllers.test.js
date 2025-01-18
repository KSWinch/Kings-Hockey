import { expect, test } from "vitest";
import { scrapeStandings } from "../../src/controllers/scraperController.js";

test("scraperStandings return proper team names test", async () => {
  const standingsResults = await scrapeStandings();
  console.log(standingsResults);
  console.log(JSON.stringify(standingsResults));
  //   expect(scrapeStandings).toBe(3);
});
