
export const API_ROUTES = {
  auth: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
  },

  workouts: {
    createWorkout: '/api/workouts',
    updateWorkout:'/api/workouts',
    getWorkout :'/api/workouts',
    getAllWorkouts : '/api/workouts/'
   
  },

  analytics: {
    type:'/api/workouts/stats/type-breakdown',
    trend:'/api/workouts/stats/get-weekly-trends',
    records:'/api/workouts/stats/getPersonalRecordsStats'
  },
};