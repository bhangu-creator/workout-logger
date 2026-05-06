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
        //extracts token from cookies 
        const accessToken = req.cookies.accessToken;

        //checks if token exist
        if((!accessToken))
        {
            return res.status(401).json({error:"Access Denied. Access Token not provided"})
        }

        //verify the access token using JWT secret
        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

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