// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require("./config/db");

// Initialize app
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/waste", require("./routes/wasteRoutes"));

// Test route (health check)
app.get("/", (req, res) => {
  res.send("✅ GreenChain Backend is running");
});

// Connect to MongoDB, then start server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
  });
