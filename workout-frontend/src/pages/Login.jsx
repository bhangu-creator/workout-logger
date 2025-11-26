// Importing hooks, components, utilities, and axios
import { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import LogoHeader from "./LogoHeader.jsx";
import {validateEmail,validatePassword} from "../utils/validators.js";
import axios from "axios";


function Login()
{

// React Router hook for redirecting the user
  const navigate = useNavigate();

    // Form data state
const [formData,setFormData] = useState(
    {
        email:"",
        password:""
    }
);

// Form field error messages
const [errors,setErrors] = useState(
    {
        email:"",
        password:""
    }
);

// Message returned from backend (success or error)
const [serverMessage,setServerMessage] = useState("");

 // Loading state for disabling button + showing spinner text
const [loading,setLoading]= useState(false);

 // Validates email and password fields
const validateFormDate = ()=>
{
    const newErrors={email:"",password:""};

    newErrors.email=validateEmail(formData.email);
    newErrors.password=validatePassword(formData.password);

    setErrors(newErrors);
    return Object.values(newErrors).every(error=>error=="");
}

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
             {/* Reusable header logo */}
            <LogoHeader/>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center"> Log In </h2>
            {/*Form starts*/}
            <form onSubmit={ async (e)=>
                {
                    e.preventDefault();

                    // Client-side validation check
                    const isValid=validateFormDate();
                    if(!isValid){return}
                    
                    // Prepare UI before sending API request
                    setLoading(true);
                    setServerMessage("");
                     try{
                        // Sending login POST request
                        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,formData);
                        setServerMessage(response.data.message||"Login Successfull")
                        
                        // Store JWT token in browser storage
                        localStorage.setItem("token",response.data.token);

                        // Small delay for smooth UX
                        await new Promise(res=> setTimeout(res,1000));

                        // Redirect user to dashboard
                        navigate("/dashboard");

                     }catch(error)
                     {
                        // Display backend error or fallback error
                        setServerMessage(error.response?.data?.error||"Something went wrong");
                     }finally{
                        // Always stop loading spinner
                        setLoading(false);
                     }

                }
            } >
                {/*Email field */}
                <label className="block mb-2 font-semibold">
                    Enter Email
                </label>
                <input type="email" value={formData.email} name="email" autoComplete="email" className="w-full p-2 border rounded mb-4" placeholder="Enter Email"
                 onChange={(e)=> setFormData(prev=>({...prev , email: e.target.value}))
                 }/>
                 {errors.email && (
                    <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                 )}
                {/*Password field*/}
                <label className="block mb-2 font-semibold">
                    Enter Password
                </label>
                <input type="password" value={formData.password} name="password" autoComplete="password" placeholder="Enter Password" className="w-full p-2 border rounded mb-4"
                onChange={(e)=>setFormData(prev=>({...prev , password:e.target.value}))}/>
                {errors.password && (<p className="text-red-500 text-sm mb-2">{errors.password}</p>)}

                {/* forgot password link*/ }
                <Link to="/forgotpassword"  className="text-blue-600 text-sm hover:underline cursor-pointer">Forgot password</Link>

                {/*Submit Button*/}
                {serverMessage && (
                   <p className={`text-center text-sm mt-2 ${serverMessage.includes("Success")?"text-green-600" : "text-red-500"}`}>{serverMessage}</p>
                )}
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50">
                    {loading? "Logging In...":"Log In"}
                </button>
            </form>
             </div>
        </div>

    )
}

export default Login;
