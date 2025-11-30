import LogoHeader from "./LogoHeader";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { validateStrongPassword,confirmPassword } from "../utils/validators";
import axios from "axios";

function ResetPassword()
{

    const {token}=useParams();

    const navigate = useNavigate();

    const [formData,setFormData] = useState({passwordInput1:"",newPassword:""});
    
    const [errors,setErrors] = useState({passwordInput1:"",newPassword:""});

    const [serverMessage,setServerMessage] = useState("");
    
    const [loading,setLoading] = useState(false);

    function validateForm()
    {
        const newErrors={passwordInput1:"",newPassword:""};
        newErrors.passwordInput1=validateStrongPassword(formData.passwordInput1);
        newErrors.newPassword=confirmPassword(formData.passwordInput1,formData.newPassword);

        setErrors(newErrors);
        return Object.values(newErrors).every(error=>error=="");

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            <LogoHeader/>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
            {/*Form Starts*/}
            <form 
            onSubmit={async (e)=>
            {
                e.preventDefault();
                const valid=validateForm();
                if(!valid){return}
                try{
                setServerMessage("");
                setLoading(true);
                const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`,formData);
                await new Promise(res=>setTimeout(res,1000));
                setServerMessage(response.data.message||"Password Reset Successfull");
                setTimeout(()=>navigate('/login'),1500);
                }catch(error)
                {
                    setServerMessage(error.response?.data?.error||"Something went wrong");
                }finally{
                    setLoading(false);
                }

            }
            }
            >
                <label className="block mb-2 font-semibold" > Enter New Password</label>
                <input type="password" name="newPassword" value={formData.password} placeholder="Enter Password" className="w-full p-2 border rounded mb-4" autoComplete="new-password"
                onChange={(e)=>
                {
                    setFormData(prev=>({...prev,passwordInput1:e.target.value}))
                }
                }/>
                {errors.passwordInput1&&(
                    <p className="text-sm text-center text-red-500 mb:2">{errors.passwordInput1}</p>
                )}
                <label className="block mb-2 mt-2 font-semibold">Confirm Password</label>
                <input type="password" name="newPassword" value={formData.password} placeholder="Enter Password Again" className="w-full p-2 border rounded mb-4"autoComplete="new-password"
                onChange={(e)=>
                {
                    setFormData(prev=>({...prev,newPassword:e.target.value}))
                }                
                }/>
                {errors.newPassword &&(
                    <p className="text-sm text-center text-red-500 mb:2">{errors.newPassword}</p>
                )}

                {serverMessage && (
                    <p className={`text-center text-sm ${serverMessage.includes("successfull")? "text-green-500":"text-red-500"}`}>{serverMessage}</p>
                )}
                <button type="submit" className="w-40 block mx-auto text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50  bg-blue-500" disabled={loading}>{loading?"Reseting Password...":"Reset Password"}</button>
            </form>
            </div>
        </div>

    )
}

export default ResetPassword;