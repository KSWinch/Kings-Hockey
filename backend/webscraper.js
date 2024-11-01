import puppeteer from "puppeteer";

export default class WebScraperService {
  constructor(url) {
    this.url = url;
  }

  async initializeWebScraper() {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.goto(this.url, { waitUntil: "networkidle0" });
  }

  async getElement() {
    const data = await this.page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".schedule tr"));
      return rows.slice(1).map((row) => row.innerText.trim());
    });

    // Parse the data into JSON
    const parsedData = data
      .filter((row) => row) // Remove any empty rows
      .map((row) => {
        const columns = row.split("\t");
        return {
          homeTeam: columns[0].trim(),
          awayTeam: columns[2].trim(),
          date: columns[4].trim(),
          time: columns[5].trim(),
          location: columns[7].trim(),
          rink: columns[8].trim(),
        };
      });

    return parsedData;
  }

  async getPlayerStats() {
    const playerData = await this.page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#stats-players-active tbody tr")
      );
      const players = rows.map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          jerseyNumber: columns[0]?.innerText.trim(),
          name: columns[1]?.innerText.trim(),
          position: columns[2]?.innerText.trim(),
          gamesPlayed: columns[3]?.innerText.trim(),
          goals: columns[4]?.innerText.trim(),
          assists: columns[5]?.innerText.trim(),
          points: columns[6]?.innerText.trim(),
          pointsPerGame: columns[7]?.innerText.trim(),
          penaltyMinutes: columns[8]?.innerText.trim(),
          powerPlayGoals: columns[9]?.innerText.trim(),
          shortHandedGoals: columns[10]?.innerText.trim(),
          gameWinningGoals: columns[11]?.innerText.trim(),
        };
      });

      // Filter out empty rows and duplicates by name and jersey number
      return players.filter(
        (player, index, self) =>
          player.name &&
          self.findIndex(
            (p) =>
              p.name === player.name && p.jerseyNumber === player.jerseyNumber
          ) === index
      );
    });

    return playerData;
  }
}
