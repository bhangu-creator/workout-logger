import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Workouts from "./pages/Workouts";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
    <Route path="/workouts"element={<ProtectedRoute><Workouts/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
