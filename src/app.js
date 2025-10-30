const express =require('express');
const app=express();
const workoutRoutes=require('./routes/workoutRoutes');

app.use(express.json());
app.use('/api/workouts',workoutRoutes)

app.get('/',(req,res)=>{

    res.send("Workout Logger is Running here");

});

const PORT=3000
app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:3000")

});

module.exports=app;