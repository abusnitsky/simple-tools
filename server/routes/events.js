import express from 'express';
import Event from '../model/Event.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { year, month, day } = req.query;
        let filter = {};

        if (year || month || day) {
            let startDate = new Date(year || new Date().getFullYear(), (month - 1) || 0, day || 1);
            let endDate = new Date(startDate);

            if (day) {
                endDate.setDate(endDate.getDate() + 1); // Next day
            } else if (month) {
                endDate.setMonth(endDate.getMonth() + 1); // Next month
            } else {
                endDate.setFullYear(endDate.getFullYear() + 1); // Next year
            }

            filter.date = { $gte: startDate, $lt: endDate };
        }

        const events = await Event.find(filter);
        res.json(events);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("❌ Error adding event:", error);
        res.status(500).json({ error: "Failed to add item" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { year, month, day } = req.query;
        let filter = {};

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (year || month || day) {
            let startDate = new Date(year || new Date().getFullYear(), (month - 1) || 0, day || 1);
            let endDate = new Date(startDate);

            if (day) {
                endDate.setDate(endDate.getDate() + 1); // Next day
            } else if (month) {
                endDate.setMonth(endDate.getMonth() + 1); // Next month
            } else {
                endDate.setFullYear(endDate.getFullYear() + 1); // Next year
            }

            filter.date = { $gte: startDate, $lt: endDate };
        }

        const events = await Event.find(filter);
        res.json(events);
    } catch (error) {
        console.error("❌ Error deleting Event:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;