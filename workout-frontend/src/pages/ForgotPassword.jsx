import { useState } from "react";
import { validateEmail } from "../utils/validators";
import LogoHeader from "../components/LogoHeader";
import axios from "axios";

function ForgotPassword()
{

    const [formData,setFormData] = useState({email:""});

    const [errors,setErrors] = useState({email:""});

    const [ serverMessage,setServerMessage] = useState("");

    const [loading,setLoading] = useState(false);

    function validateFormData()
    {
        const newErrors={email:""};
        newErrors.email=validateEmail(formData.email);

        setErrors(newErrors);
        return Object.values(newErrors).every(error=>error=="");

    }

    return(

         <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {/*Reusable Logo Header*/}
            <LogoHeader/>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center"> Enter registered email</h2>
                    {/*form starts*/}
                    <form 
                    onSubmit={async (e)=>
                        {
                            e.preventDefault();
                            const valid=validateFormData();
                            if(!valid){return}
                            try{
                            setServerMessage("");
                            setLoading(true);
                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgotpassword`,formData);
                            await new Promise(res=>setTimeout(res,1000));
                            setServerMessage(response.data.message||"if that email exists, a reset link has been sent!");
                            }catch(error)
                            {
                                setServerMessage(error.response?.data?.error||"Something went Wrong");

                            }finally{
                                setLoading(false);
                            }
                        }
                    }
                    >
                        <input name="email" type="email" value={formData.email} placeholder="Enter email" autoComplete="email" className="w-full p-2 border rounded mb-4" onChange={(e)=>
                        {
                            setFormData(prev=>({...prev,email:e.target.value}))
                        }
                        }/>
                        {errors.email &&(
                            <p className="text-red-500 text-sm mb-2 text-center">{errors.email}</p>
                        )}
                        <p className="text-gray-600 text-center text-sm mb-4">A reset link will be sent to your registered email</p>
                        {serverMessage && (
                            <p className="text-sm text-center mt-2 text-green-600">{serverMessage}</p>
                        )}
                        <button disabled={loading}type="submit" className="w-40 block mx-auto bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50"> {loading?"Sending Reset Link...":"Send Link"}</button>
                    </form>
                </div>

         </div>
    )
}

export default ForgotPassword;