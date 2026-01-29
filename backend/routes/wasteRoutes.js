  const express = require("express");
  const router = express.Router();
  const WasteRecord = require("../models/WasteRecord");

  // POST: save waste data (simulating Arduino)
  router.post("/", async (req, res) => {
    try {
      const body = req.body || {};
      const { deviceId, weightKg } = body;

      if (!deviceId || weightKg === undefined) {
        return res.status(400).json({
          error: "Missing required fields: deviceId and weightKg",
          hint: "Send JSON with Content-Type: application/json",
        });
      }

      const weight = Number(weightKg);
      if (isNaN(weight) || weight < 0) {
        return res.status(400).json({ error: "weightKg must be a valid number >= 0" });
      }

      // Map weightKg to quantity (required by model) and include deviceId
      const record = new WasteRecord({
        deviceId,
        weightKg: weight,
        quantity: weight,
        type: "other",
      });
      await record.save();

      res.status(201).json({
        message: "Waste data saved",
        data: record
      });
    } catch (err) {
      console.error("Error saving waste record:", err);
      const message = err.message || "Server error";
      const isValidation = err.name === "ValidationError";
      res.status(isValidation ? 400 : 500).json({
        error: isValidation ? "Validation error" : "Server error",
        details: message,
      });
    }
  });

  // GET: fetch all waste data
  router.get("/", async (req, res) => {
    const records = await WasteRecord.find().sort({ createdAt: -1 });
    res.json(records);
  });

  module.exports = router;
