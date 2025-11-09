import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/marketplace", marketplaceRoutes);

app.get("/", (req, res) => res.send("✅ Backend running successfully"));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
