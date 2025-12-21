//importing the required modules
import {jwtDecode} from "jwt-decode";

//this function will deconstruct the jwt to get the current logged in user's details
function getUserDetails()
{
    const token = localStorage.getItem("token");
    if(!token) return null;

    try{

    const decoded = jwtDecode(token);
    return {id:decoded.id,
        email:decoded.email,
        username:decoded.username
    };
    }catch(err)
    {
        console.error("Invalid Token");
        return null;
    }
}

export default getUserDetails;