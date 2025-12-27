import { useState } from "react";
import {validateExercise} from "../utils/validators"

function AddExerciseSection({resetForm,onAddExercise})
{

    const [formData,setFormData] =useState(
    {
        name: "",
        sets: "",
        reps : "",
        weight: "",
        duration : "",
        kcalBurned : ""
    })

    const [errors,setErrors] = useState({})

  

     const validateForm = ()=>
    {
       const newErrors=validateExercise(formData.name,formData.sets,formData.reps,formData.weight,formData.duration,formData.kcalBurned);
       setErrors(newErrors);
       return Object.keys(newErrors).length==0;
        
    }

    const handleClear =()=>
    {
        setFormData({  
        name: "",
        sets: "",
        reps : "",
        weight: "",
        duration : "",
        kcalBurned : ""
    });

        setErrors({})
    }

    return (
         <div className="w-full space-y-6">                

                <div 
                    className="border border-gray-300 rounded-lg  pt-8 px-4 p-4 shadow-sm bg-white relative"
                >
                    {/* NAME */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Name</label>
                        <input
                            value={formData.name}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            onChange={(e)=>setFormData(prev=>({...prev , name:e.target.value}))}
                        />
                    </div>
                        {errors.exname &&(
                            <p className="text-red-500">{errors.exname}</p>
                        )}                    

                    {/* SETS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Sets</label>
                        <input
                            value={formData.sets}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            onChange={(e)=>setFormData(prev=>({...prev , sets:e.target.value}))}
                        />                      
                    </div>
                        {errors.sets &&(
                            <p className="text-red-500">{errors.sets}</p>
                        )} 

                    {/* REPS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Reps</label>
                        <input
                            value={formData.reps}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            onChange={(e)=>setFormData(prev=>({...prev , reps:e.target.value}))}
                        />                     
                    </div>
                        {errors.reps &&(
                            <p className="text-red-500">{errors.reps}</p>
                        )}   

                    {/* WEIGHT */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Weight</label>
                        <input
                            value={formData.weight}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            placeholder="in kgs"
                            onChange={(e)=>setFormData(prev=>({...prev , weight:e.target.value}))}
                        />                        
                    </div>
                        {errors.weight &&(
                            <p className="text-red-500">{errors.weight}</p>
                        )}  

                    {/* DURATION */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Duration</label>
                        <input
                            value={formData.duration}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            placeholder="in minutes"
                            onChange={(e)=>setFormData(prev=>({...prev , duration:e.target.value}))}
                        />                        
                    </div>
                        {errors.duration &&(
                            <p className="text-red-500">{errors.duration}</p>
                        )}  

                    {/* KCAL */}
                    <div className="flex items-center gap-3">
                        <label className="w-32 text-gray-700 font-semibold">Calories</label>
                        <input
                            value={formData.kcalBurned}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            onChange={(e)=>setFormData(prev=>({...prev , kcalBurned:e.target.value}))}

                        />                         
                    </div>
                        {errors.calories &&(
                            <p className="text-red-500">{errors.calories}</p>
                        )}  

                    <div className="flex justify-center gap-10 mt-5 ">
                        <button type="button" className="px-1 py-1 bg-gray-500 rounded-lg text-white hover:bg-gray-600" onClick={handleClear}>Clear Feilds</button>
                        <button type="button" className="px-1 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" 
                        onClick={()=>
                        {
                            if(!validateForm()) return
                            onAddExercise(formData);
                            resetForm();
                        }
                        }>Log Exercise</button>
                        <button type="button" className="px-1 py-1 bg-gray-500 rounded-lg text-white hover:bg-gray-600" onClick={resetForm}>Close</button>
                    </div>
                </div>
        </div>
    )
}

export default AddExerciseSection;