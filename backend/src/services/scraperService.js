import puppeteer from "puppeteer";

export default class WebScraperService {
  constructor(url) {
    this.url = url;
  }

  async initializeWebScraper() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();
    await this.page.goto(this.url, { waitUntil: "networkidle0" });
  }

  async getSchedule() {
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
          jerseyNumber: parseInt(columns[0]?.innerText.trim()),
          name: columns[1]?.innerText.trim().replace("check", "").trim(),
          position: columns[2]?.innerText.trim(),
          gamesPlayed: parseInt(columns[3]?.innerText.trim()),
          goals: parseInt(columns[4]?.innerText.trim()),
          assists: parseInt(columns[5]?.innerText.trim()),
          points: parseInt(columns[6]?.innerText.trim()),
          pointsPerGame: parseInt(columns[7]?.innerText.trim()),
          penaltyMinutes: parseInt(columns[8]?.innerText.trim()),
          powerPlayGoals: parseInt(columns[9]?.innerText.trim()),
          shortHandedGoals: parseInt(columns[10]?.innerText.trim()),
          gameWinningGoals: parseInt(columns[11]?.innerText.trim()),
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

  //Reserved for Fotus standings scraper
  async getStandings() {
    const standingsData = await this.page.evaluate(() => {
      // Select all rows in the standings table
      const rows = Array.from(
        document.querySelectorAll(
          ".table-scroll > .table-scroll > .stats-table.standings tbody tr"
        )
      );
      // Map each row to an object representing team standings
      const standings = rows.map((row) => {
        const columns = row.querySelectorAll("td");

        return {
          games_played: parseInt(columns[2]?.innerText.trim()),
          goal_differential: columns[12]?.innerText.trim(),
          goals_against: parseInt(columns[11]?.innerText.trim()),
          goals_for: parseInt(columns[9]?.innerText.trim()),
          last_10_games: columns[14]?.innerText.trim(),
          losses: parseInt(columns[4]?.innerText.trim()),
          overtime_losses: parseInt(columns[6]?.innerText.trim()),
          penalty_minutes: parseInt(columns[13]?.innerText.trim()),
          points: parseInt(columns[7]?.innerText.trim()),
          rank: parseInt(columns[0]?.innerText.trim()),
          regulation_wins: parseInt(columns[8]?.innerText.trim()),
          streak: columns[15]?.innerText.trim(),
          team: columns[1]?.innerText.trim(),
          ties: parseInt(columns[5]?.innerText.trim()),
          wins: parseInt(columns[3]?.innerText.trim()),
        };
      });

      return standings;
    });

    return standingsData;
  }
}
