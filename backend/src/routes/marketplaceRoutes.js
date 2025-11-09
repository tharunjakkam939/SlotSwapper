import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: "SWAPPABLE",
        ownerId: { not: req.user.id },
      },
      include: {
        owner: { select: { name: true, email: true } },
      },
    });
    res.json(events);
  } catch {
    res.status(500).json({ error: "Failed to fetch marketplace events" });
  }
});

export default router;
