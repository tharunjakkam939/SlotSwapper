import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        ownerId: req.user.id,
        status: "BUSY",
      },
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { ownerId: req.user.id },
      orderBy: { startTime: "asc" },
    });
    res.json(events);
  } catch {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.put("/:id/status", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return res.status(404).json({ error: "Event not found" });

    const newStatus = event.status === "SWAPPABLE" ? "BUSY" : "SWAPPABLE";
    const updated = await prisma.event.update({ where: { id }, data: { status: newStatus } });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
