//import the required modules
import axios from "axios";
import {API_BASE_URL,ENDPOINTS} from "../api/endpoints";


//create an axios instance with Credentials
const api = axios.create({
    baseURL : API_BASE_URL,
    withCredentials :true

})

//response interceptor
api.interceptors.response.use(

    //do nothing if response is successfull
    (response)=>response,

    //if response is an error
    async (error)=>
    {
        //extract the original request for which the error occurs
        const originalReq = error.config;

        //check if the error code is 401 and if its not already retried
        if(error.response?.status===401 && !originalReq._retry){
            originalReq._retry=true;

            try{
                //refresh the accesstoken
                await axios.post(API_BASE_URL+ENDPOINTS.REFRESH_TOKEN,{},{withCredentials:true});
                //retry the original request
                return api(originalReq);

            }catch(refreshError)
            {
                // refresh token also failed — user needs to login again
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
);

export default api;
