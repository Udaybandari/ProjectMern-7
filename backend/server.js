// Load environment variables FIRST
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const taskRoutes=require("./routes/taskRoutes")
const reportRoutes=require("./routes/reportRoutes")
const adminRoutes=require("./routes/adminRoutes")
// Connect to Database
connectDB();

// Middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//middleware
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/reports",reportRoutes);
app.use("/api/admins",adminRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);