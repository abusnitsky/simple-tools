import express from 'express';
import Event from '../model/Event.js';

const router = express.Router();


// GET: Fetch Events
/* router.get("/", async (req, res) => {
    try {
        const { year, month, day } = req.query;
        let filter = {};

        if (year) filter.year = year;
        if (month) filter.month = month;
        if (day) filter.day = day;

        const events = await Event.find(filter);
        res.json(events);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
}); */

// GET: Fetch Events
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

// POST: Add a new Event
router.post("/", async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("❌ Error adding event:", error);
        res.status(500).json({ error: "Failed to add item" });
    }
});

export default router;