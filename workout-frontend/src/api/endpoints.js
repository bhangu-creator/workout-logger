export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
;

export const ENDPOINTS ={
        
    SIGNUP : "/api/auth/signup",
    LOGIN:"/api/auth/login",
    RESETPASSWORD : "/api/auth/reset-password/",
    FORGOTPASSWORD: "/api/auth/forgotpassword",
    GET_ALL_WORKOUTS:"/api/workouts/",
    POST_WORKOUT : "/api/workouts/",
    PUT_WORKOUT:"/api/workouts/",
    DELETEWORKOUT :"/api/workouts/",
    GET_WORKOUTS_STATS_BY_TYPE :"/api/workouts/stats/type-breakdown",
    GET_WORKOUTS_TREND : "/api/workouts/stats/get-weekly-trends",
    GET_WORKOUTS_RECORDS : "/api/workouts/stats/getPersonalRecordsStats"
};