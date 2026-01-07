/**
 * @file server file
 * @desc starts the server and mongodb and handles all the routes 
 */

const express = require("express");
const mongoose = require("mongoose");   
const dotenv = require("dotenv");
const cors = require("cors");

const authUserRoutes = require("./src/routes/authUsersRoutes.js");
const workoutController = require("./src/routes/workoutRoute.js");
const workoutStatsRoutes = require("./src/routes/workoutStatsRoutes.js");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Test / health route
app.get("/", (req, res) => {
  res.send("Workout Logger API is running 🚀");
});

// Routes
app.use("/api/auth", authUserRoutes);
app.use("/api/workouts/stats", workoutStatsRoutes);
app.use("/api/workouts", workoutController);

// Start server AFTER DB connection
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

//initializing the centralized error handling middlware
app.use((err,req,res,next)=>
{
  const statusCode = err.statusCode || 500;
  const message= err.message|| "Interval Server Error";
  res.status(statusCode).json({
    success:false,
    error:message})
}
)
