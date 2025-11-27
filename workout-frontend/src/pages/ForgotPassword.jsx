import { useState } from "react";
import { validateEmail } from "../utils/validators";
import LogoHeader from "./LogoHeader";

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

         </div>



    )












}

export default ForgotPassword;