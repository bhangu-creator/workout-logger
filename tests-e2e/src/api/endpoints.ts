import { updateWorkout } from "../test-data/workout";

export const API_ROUTES = {
  auth: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
  },

  workouts: {
    getAll: '/api/workouts',
    createWorkout: '/api/workouts',
    updateWorkout:'/api/workouts',
    byId: (workoutId: string) => `/api/workouts/${workoutId}`,
  },

  analytics: {
    summary: '/api/analytics/summary',
    category: '/api/analytics/category',
    monthly: '/api/analytics/monthly',
  },
};