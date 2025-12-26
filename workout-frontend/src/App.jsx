import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Workouts from "./pages/Workouts";
import WorkoutsByType from "./pages/WorkoutsByType";
import WorkoutTrend from "./pages/WorkoutTrend";
import WorkoutRecords from "./pages/WorkoutRecords";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
    <Route path="/workouts" element={<ProtectedRoute><Workouts/></ProtectedRoute>}/>
    <Route path="/workoutsByType" element={<ProtectedRoute><WorkoutsByType/></ProtectedRoute>} />
    <Route path="/workoutsTrends" element={<ProtectedRoute><WorkoutTrend/></ProtectedRoute>} />
    <Route path="/workoutRecords" element={<ProtectedRoute><WorkoutRecords/></ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
