import express from "express";
import userRoutes from "./routes/userRoutes.js";
import scraperRoutes from "./routes/scraperRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import standingsRoutes from "./routes/standingsRoutes.js";
import penaltyRoutes from "./routes/penaltyRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);
app.use("/scrape", scraperRoutes);
app.use("/stats", statsRoutes);
app.use("/games", gamesRoutes);
app.use("/standings", standingsRoutes);
app.use("/goals", goalRoutes);
app.use("/penalties", penaltyRoutes);

export default app;
