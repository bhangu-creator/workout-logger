const express = require('express');
const router= express.Router();

router.get('/',(req,res)=>{
    res.json({message:'Get all workouts'});

});


router.get('/:id',(req,res)=>{
    const workoutId=req.params.id
    res.json({message:`your requested workout ID: ${workoutId}`});

});

router.post('/',(req,res)=>{
    res.json({message:"create new workout"});
})

module.exports= router;