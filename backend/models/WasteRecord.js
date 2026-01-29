const mongoose = require("mongoose");

const wasteRecordSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: false,
      trim: true,
      enum: ["plastic", "paper", "metal", "glass", "organic", "electronic", "other"],
      default: "other",
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    weightKg: {
      type: Number,
      min: 0,
    },
    unit: {
      type: String,
      default: "kg",
      enum: ["kg", "g", "pieces", "liters"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteRecord", wasteRecordSchema);
