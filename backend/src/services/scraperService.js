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
      const gameIds = rows.slice(1).map((row) => {
        // Select all <a> tags within the row
        const anchorTags = row.querySelectorAll("tr.ng-scope a");

        // Filter for links with text "Final" or "Preview"
        const filteredLinks = Array.from(anchorTags).filter((a) =>
          ["Final", "Preview"].includes(a.textContent.trim())
        );

        // Extract the href of the first matching link
        const href = filteredLinks[0]?.href || "";

        // Extract the numeric ID from the href using a regular expression
        const match = href.match(/\/game\/(\d+)(?:\/.*)?$/);

        // Return the numeric ID or an empty string if not found
        return match?.[1] || "";
      });

      const returnRows = rows.slice(1).map((row, index) => {
        const rowText = row.innerText.trim();

        // If the row text is empty, return it as-is; otherwise, append the game ID
        return rowText ? `${rowText}\t${gameIds[index]}` : rowText;
      });
      return returnRows;
    });

    // Parse the data into JSON
    const parsedData = data
      .filter((row) => row) // Remove any empty rows
      .map((row) => {
        const columns = row.split("\t");
        return {
          awayTeam: columns[2].trim(),
          date: columns[4].trim(),
          homeTeam: columns[0].trim(),
          id: parseInt(columns[10].trim()),
          location: columns[7].trim(),
          rink: columns[8].trim(),
          time: columns[5].trim(),
        };
      });

    return parsedData;
  }

  async getGameDetails() {
    let data = await this.page.evaluate(() => {
      const rawRows = Array.from(
        document.querySelectorAll(".table-fixed table tbody tr")
      );
      const tdRegex = /<td[^>]*>(.*?)<\/td>/g;

      const tableRows = rawRows.map((row) => {
        const rowHtmlString = row.innerHTML; // Cache the inner HTML to avoid multiple DOM reads
        const values = [];

        // Extract all <td> contents using the regex
        let match;
        while ((match = tdRegex.exec(rowHtmlString)) !== null) {
          const tdContent = match[1]; // The captured group from the tdRegex

          // Check if the <td> content contains an <a> tag
          if (tdContent.includes("<a")) {
            // Match all anchor tags and the associated text
            const allAnchors = [
              ...tdContent.matchAll(/(#\d+\s)?<a[^>]*>(.*?)<\/a>/g),
            ];

            if (allAnchors.length > 0) {
              // Extract and format each match
              const formattedValues = allAnchors.map((anchorMatch) => {
                const prefix = anchorMatch[1] ? anchorMatch[1].trim() : ""; // E.g., #13 or #10
                const name = anchorMatch[2].trim(); // Extract the name inside the <a> tag
                return `${prefix}${name}`;
              });

              // Add the combined formatted values to the array
              values.push(formattedValues.join(", "));
            } else {
              // No anchors found, push plain content
              values.push(tdContent.trim());
            }
          } else {
            // If no <a> tag, just push the plain text content
            values.push(tdContent.trim());
          }
        }
        return values;
      });
      const sortedRows = {
        penalties: [],
        goals: [],
      };
      // Identify if row is for goal or penalty based on array length (present empty div at end of goals)
      tableRows.forEach((row) => {
        if (row.length === 6) {
          sortedRows.penalties.push(row);
        } else if (row.length === 7) {
          sortedRows.goals.push(row);
        }
      });
      return sortedRows;
    });
    const parsedGoals = data.goals
      .filter((row) => row)
      .map((row) => {
        return {
          assister_1: row[4].split(", ")[1]
            ? row[4].replace(/#(\d+)([A-Za-z])/g, "#$1 $2").split(", ")[1]
            : "",
          assister_2: row[4].split(", ")[2]
            ? row[4].replace(/#(\d+)([A-Za-z])/g, "#$1 $2").split(", ")[2]
            : "",
          period: row[0],
          scorer: row[4].replace(/#(\d+)([A-Za-z])/g, "#$1 $2").split(", ")[0],
          team: row[3],
          time: row[1],
          total: row[5],
        };
      });
    const parsedPenalties = data.penalties
      .filter((row) => row)
      .map((row) => {
        return {
          infraction: row[4],
          length: row[5],
          period: row[0],
          player: row[2].replace(/#(\d+)([A-Za-z])/g, "#$1 $2"),
          team: row[3],
          time: row[1],
        };
      });

    const parsedGameDetailsData = {
      goals: parsedGoals,
      penalties: parsedPenalties,
    };
    return parsedGameDetailsData;
  }

  async getScore() {
    const data = await this.page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".scores tr"));
      return rows.slice(1).map((row) => row.innerText.trim());
    });

    // Parse the data into JSON
    const parsedData = data
      .filter((row) => row) // Remove any empty rows
      .map((row) => {
        const columns = row.split("\t");
        return {
          score: columns[2].trim(),
          date: columns[3].trim(),
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
