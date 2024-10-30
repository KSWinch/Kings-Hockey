import puppeteer from "puppeteer";

export default class WebScrapperService {
  constructor(url) {
    this.url = url;
  }

  async initializeWebScrapper() {
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
      .map((row, index) => {
        const columns = row.split("\t");
        return {
          id: index,
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
}
