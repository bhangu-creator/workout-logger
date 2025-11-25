//importing the required modules
import { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Signup Component
// - Handles user registration UI
// - Performs client-side validation
// - Sends signup data to backend API
// - Displays backend validation errors
// - Redirects to login page on successful signup

function Signup()
{
    
    //initialzing the navigate hook
    const navigate = useNavigate();

    //Initializing fromData state
    //purpose - use to store the data input in form by user
    //value - formData: form data, setFormData - update form data when react state changes
    const [formData, setFormData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    );

    //Initializing error state
    //purpose - use to store the errors thrown by the input form
    //value - errors: error values, setErrors - assign the error to specific input field
    const [errors,setErrors] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    )

 
    //Initializing server  state
    //purpose - use to store the message sent by server side and to hold the loading status
    //value - serverMessage : stores the sever message, setServerMessage : display the message sent via server
    //      - loading - holds true or false , setLoading: changes the loading state to make button disable or enable

    const [serverMessage,setServerMessage] = useState("");
    const [loading,setLoading]= useState(false);


    // Validates form fields before sending data to backend
    //Returns true if all fields are valid; otherwise populates errors state

    const validateForm =()=>
    {
        const newErrors={name:"",email:"",password:""};

        if (!formData.name.trim())
        {
            newErrors.name="Username is required";
        }
        else if(formData.name.trim().length>30)
        {
            newErrors.name="Username is too long";

        }

        if (!formData.email.trim())
        {
            newErrors.email="Email is required";
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        {
            newErrors.email="Invalid email format";
        }

        if (!formData.password.trim())
        {
            newErrors.password="Password is required";
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/.test(formData.password))
        {
            newErrors.password="Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be atleast 8 characters long."
        }

        setErrors(newErrors);
       return Object.values(newErrors).every(error => error === "");


    }
    
    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">

            {/*Top Left Logo* with the App name*/}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <img src={logo} alt="Workout Logger Logo" className="w-14 h-14 rounded-full object-cover" />
                    <span className="text-red-600 font-bold text-2xl">Workout Logger</span>
                </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                 {/* Form Starts */}
                 <form

                 //onSubmit function gets called when clicked on signup button
                  onSubmit={ async (e)=>
                    {
                        //prevents the browser to refresh
                        e.preventDefault();
                        //validating if the form input values 
                        const isValid=validateForm();
                        if(!isValid){return}
                        console.log("Form is valid, sending the data to backend");

                        //sent the Post API to backend
                        //endpoint hit - /api/auth/signup
                        //data sent - form data including - username,email,password 
                        //response expected -  200/201 status - OK, 400/404 status - Bad request
                        setLoading(true);
                        setServerMessage("");
                        try{

                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,formData);
                            
                            //backend return message
                            setServerMessage(response.data.message||"Signup Successfull");

                            //wait 1 sec than redirect to login
                            await new Promise(res=> setTimeout(res,1000));
                            navigate("/login")
                        }catch(error){
                            console.log(error.response)
                            setServerMessage(error.response?.data?.error||"Something went wrong");
                        } finally{
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

//exporting the required modules
export default Signup;