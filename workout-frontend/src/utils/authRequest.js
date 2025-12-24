//this file is used to verify the validity of the token sent in any protected route

import axios from "axios";

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

export default authRequest;