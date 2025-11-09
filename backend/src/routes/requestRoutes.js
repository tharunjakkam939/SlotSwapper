import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create a new swap request
router.post("/", authenticate, async (req, res) => {
  try {
    const { mySlotId, theirSlotId } = req.body;
    const requesterId = req.user.id;

    const request = await prisma.swapRequest.create({
      data: {
        requesterId,
        mySlotId,
        theirSlotId,
        status: "PENDING",
      },
    });

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get incoming requests for logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.swapRequest.findMany({
      where: {
        theirSlot: {
          ownerId: userId,
        },
      },
      include: {
        requester: { select: { name: true, email: true } },
        mySlot: { select: { title: true } },
        theirSlot: { select: { title: true } },
      },
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Accept a swap request
router.put("/:id/accept", authenticate, async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);

    const request = await prisma.swapRequest.findUnique({
      where: { id: requestId },
      include: {
        mySlot: true,
        theirSlot: true,
      },
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Only the owner of "theirSlot" can accept
    if (request.theirSlot.ownerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Swap ownership of the two events
    await prisma.event.update({
      where: { id: request.mySlot.id },
      data: { ownerId: request.theirSlot.ownerId },
    });

    await prisma.event.update({
      where: { id: request.theirSlot.id },
      data: { ownerId: request.mySlot.ownerId },
    });

    // Update request status
    const updated = await prisma.swapRequest.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    });

    res.json({ message: "Swap accepted!", request: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
