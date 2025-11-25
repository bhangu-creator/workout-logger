/**
 * @file server file
 * @desc starts the server and mongodb and handles all the routes 
 * @module server
 * @requires express
 * @requires mongoose
 * @requires dotenv
 * @requires cors
 * @requires ./src/routes/authUsersRoutes.js
 * @requires ./src/routes/workoutController.js
 */

//importing the required modules and routes
const express= require("express");
const mongoose =require("mongoose");   
const dotenv = require("dotenv");
const authUserRoutes =require("./src/routes/authUsersRoutes.js");
const workoutController=require("./src/routes/workoutRoute.js");
const workoutStatsRoutes= require("./src/routes/workoutStatsRoutes.js");
const cors = require("cors");

//initialize the enviroment variables
dotenv.config();

//initiliaze the Express Application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

//giving permisiion to frontend to engage with backend
app.use(cors({
    origin:"http://localhost:5173",
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}))

//Register Routes
app.use('/api/auth',authUserRoutes);
app.use('/api/workouts/stats',workoutStatsRoutes);
app.use('/api/workouts',workoutController);

//Connecting to MongoDb and start the server
mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("MongoDB Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server running on PORT ${process.env.PORT || 3000}`);
    });

   })
   .catch((err)=>console.log("MongoDb connection Error:",err));


