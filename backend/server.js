import express from "express";
import WebScrapperService from "./webscrapper.js";
import cors from "cors";
const app = express();
const PORT = 8080;

app.use(cors({ origin: 'http://localhost:3000' }));


app.get("/getSchedule", async (req, res) => {
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
