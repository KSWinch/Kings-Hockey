import express from "express";
import WebScrapperService from "./webscrapper.js";
const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
  const webscrapper = new WebScrapperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );
  await webscrapper.initializeWebScrapper();
  res.send(await webscrapper.getElement());
});

app.listen(PORT, () => {
  console.log(
    `Server is listening at 
            http://localhost:${PORT}`
  );
});
