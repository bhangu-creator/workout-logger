const User =require('../models/user.js');
const bcrypt= require("bcrypt.js");

const signup= async (req,res)=>
{
    try {

        const {name,email,password}=req.body();
        const existingUser=await User.findOne({email});

        if (existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        
        const hashPassword= await bcrypt.hash(password,10);

        const newUser= await User.create({
            name,email,password:hashPassword
        });
        res.send(201).json({
            message:"User registered Successfully",
            user:{id:newUser.id,name:newUser.name,email:newUser.email}
        });

    } catch(error){
        console.error(error);
        res.status(500).json({message:"Signup Failed",error:error.message});
    }
};

module.exports={signup};