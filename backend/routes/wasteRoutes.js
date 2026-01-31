const express = require("express");
const router = express.Router();
const WasteEvent = require("../models/WasteEvent");

// POST /api/waste - Save incoming ESP32 events
router.post("/", async (req, res) => {
  try {
    const { deviceId, event, distanceCm, timestamp } = req.body;

    // Log incoming data for debugging
    console.log("-----------------------------------------");
    console.log(`📡 ESP32 Event: ${deviceId} -> ${event} (${distanceCm}cm) @ ${timestamp || 'N/A'}`);
    console.log("-----------------------------------------");

    if (!deviceId || !event || distanceCm === undefined) {
      return res.status(400).json({ error: "Missing required fields: deviceId, event, distanceCm" });
    }

    const newEvent = new WasteEvent({
      deviceId,
      event,
      distanceCm: Number(distanceCm),
      timestamp // Field from ESP32
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event saved successfully",
      data: newEvent
    });
  } catch (err) {
    console.error("❌ Error saving event:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET /api/waste/latest - Return the absolute latest state for a specific device
router.get("/latest", async (req, res) => {
  try {
    const { deviceId } = req.query;
    if (!deviceId) return res.status(400).json({ error: "deviceId is required" });

    const latest = await WasteEvent.findOne({ deviceId }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No data found for this device" });

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/waste/logs - Return last N events for a specific device
router.get("/logs", async (req, res) => {
  try {
    const { deviceId, limit = 10 } = req.query;
    if (!deviceId) return res.status(400).json({ error: "deviceId is required" });

    const logs = await WasteEvent.find({ deviceId })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/waste - (Legacy/Internal) Return latest events sorted by time
router.get("/", async (req, res) => {
  try {
    const events = await WasteEvent.find().sort({ createdAt: -1 }).limit(50);
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;