// Importing hooks, components, utilities, and axios
import { useState } from "react";
import LogoHeader from "../components/LogoHeader.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {validateEmail,validateUsername,validateStrongPassword} from "../utils/validators.js";


function Signup()
{
    
    // React Router hook for redirecting the user
    const navigate = useNavigate();

    // Form data state
    const [formData, setFormData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    );

    // Form field error messages
    const [errors,setErrors] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    )

    // Message returned from backend (success or error)
    const [serverMessage,setServerMessage] = useState("");

     // Loading state for disabling button + showing spinner text
    const [loading,setLoading]= useState(false);
    
    // Validates email and password fields
    const validateForm =()=>
    {
        const newErrors={name:"",email:"",password:""};

        newErrors.name=validateUsername(formData.name);
        newErrors.email=validateEmail(formData.email);
        newErrors.password=validateStrongPassword(formData.password);

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");

    };
    
    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">

             {/* Reusable header logo */}
            <LogoHeader/>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                 {/* Form Starts */}
                 <form
                  onSubmit={ async (e)=>
                    {
                        //prevents the browser to refresh
                        e.preventDefault();

                        // Client-side validation check
                        const isValid=validateForm();
                        if(!isValid){return}

                        // Prepare UI before sending API request
                        setLoading(true);
                        setServerMessage("");
                        try{
                            // Sending Signup POST request
                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,formData);
                            
                            //backend return message
                            setServerMessage(response.data.message||"Signup Successfull");

                            // Small delay for smooth UX
                            await new Promise(res=> setTimeout(res,1000));

                            // Redirect user to login
                            navigate("/login")
                        }catch(error){
                            // Display backend error or fallback error
                            setServerMessage(error.response?.data?.error||"Something went wrong");
                        } finally{
                            // Always stop loading spinner
                            setLoading(false);
                        }
                    }
                 }
                 >     

                    {/*Username*/}
                    <label className="block mb-2 font-semibold">Username</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    autoComplete="name"
                    //
                    onChange={(e)=> setFormData(prev=>({ ...prev,name:e.target.value}))}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Username"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                    )}

                    {/*Email*/}
                    <label className="block mb-2 font-semibold">
                        Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    autoComplete="email"
                    onChange={(e)=>setFormData(prev=>({...prev,email:e.target.value}))}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                    )}

                    {/*Password*/}
                    <label className="block mb-2 font-semibold">
                        Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={(e)=>setFormData(prev=>({...prev, password:e.target.value}))}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                    )}

                    {/*displays the server response on UI */}
                    {serverMessage && (
                        <p className={`text-center text-sm mt-2 ${serverMessage.includes("Success")?"text-green-600" : "text-red-500"}`}>{serverMessage}</p>
                    )}
                    
                    {/*Submit Button, button shows loading state while API is running*/}
                    <button type="Submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50"
                    disabled={loading}
                    >
                    {loading ? "Signing up...":"Signup"}                      
                      </button>
                 </form>
            </div>
        </div>
    );
}

export default Signup;