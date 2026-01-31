const mongoose = require("mongoose");

const wasteEventSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    trim: true
  },
  event: {
    type: String,
    enum: ["IN", "OFF", "OPEN", "CLOSE"],
    required: true
  },
  distanceCm: {
    type: Number,
    required: true
  },
  timestamp: {
    type: String, // Storing as string to match ESP32 format
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WasteEvent", wasteEventSchema);
