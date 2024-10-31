import express from "express";
import WebScrapperService from "./webscrapper.js";
import cors from "cors";
import { insertGameData } from "./database.js"; // Import the insertGameData function

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/getSchedule", async (req, res) => {
  const webscrapper = new WebScrapperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );
  await webscrapper.initializeWebScrapper();
  const scrapedData = await webscrapper.getElement();

  // Insert the scraped data into the database
  await insertGameData(scrapedData);

  res.send(scrapedData); // Optionally send the scraped data back as a response
});

app.listen(PORT, () => {
  console.log(
    `Server is listening at 
            http://localhost:${PORT}`
  );
});
