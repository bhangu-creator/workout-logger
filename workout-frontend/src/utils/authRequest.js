//this file is used to verify the validity of the token sent in any protected route

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function authRequest(method,url,data=null,params=null)
{
    const token =localStorage.getItem("token");

    if(!token)
    {
        throw new Error("No Token Found");
    }

    return axios({
        method,
        url,
        data,
        params,
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}

export const isTokenValid = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return false;
        }
        return true;
        
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }
}


export default authRequest;