/**
 * @file Authentication Middleware
 * @desc Verifies JWT tokens and protects routes from unauthorized access
 * @module middleware/authMiddleware
 * @requires jsonwebtoken
 */

// Import JWT library to verify tokens
const jwt = require('jsonwebtoken');

/**
 * @desc Middleware function to verify JWT token and authenticate user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next function (moves to next middleware/controller)
 */

const authMiddleware = async (req, res, next) => {
    try {

        //extracts token from header 
        const authHeader=req.headers.authorization;

        //checks if token exist
        if((!authHeader || !authHeader.startsWith("Bearer ")))
        {
            return res.status(401).json({error:"Access Denied. No token provided"});
        }

        //extracts actual token
        const token= authHeader.split(' ')[1];
        
        //verify the token format
        if(!token){
            return req.status(400).json({error:"Access Denied. Invalid token format"});
        }

        //verify the token using JWT secret
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //attach user info to req object
        req.user=decoded;

        //move to next middleware/controller
        next();

    }catch(error)
    {
        console.error("Auth User Middleware Error", error.message);
        return res.status(401).json({message:"Invalid or expired token. Please login again"});
    }
};

module.exports={authMiddleware};