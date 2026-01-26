import express from "express";
import cors from "cors";
import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import checkinRoutes from "./routes/checkinRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/checkins", checkinRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Health app API is running" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});