import { useState } from "react";
import ExerciseSection from "./ExerciseSection";
import {validateSpecificExercise,canSubmitWorkout} from "../utils/validators";
import authRequest from "../utils/authRequest";
import {API_BASE_URL,ENDPOINTS} from "../api/endpoints";

function WorkoutModal({ open, mode, data, onClose, handleAddWorkoutToList,popupset }) {

    if (!open) return null;

    const [title, setTitle] = useState(data?.title || "");
    const [type, setType] = useState(data?.type || "");
    const [exercises, setExercises] = useState(data?.exercises || []);
    const [exerciseError,setExerciseError] = useState("")
    const  [titleError,setTitleError] = useState("");
    const [typeError,setTypeError]= useState("");
    const [formError,setFormError] = useState("");
    const [nullExerciseError,setNullExerciseError]=useState("");
    const [serverMessage, setServerMessage] = useState("");

    const workoutId= data?._id;


    const isView = mode === "view";
    const isEdit = mode === "edit";
    const isLog  = mode === "log";

    const WORKOUT_TYPES = [
        "strength",
        "Cardio",
        "HIT",
        "yoga",
        "other"
        ];

    const handleAddExercise = (ex)=>
    {
        setExercises((prev)=>
        {
            if(prev.length>=20)
            {
                setExerciseError("Exercise limit reached. Only 20 exercises are allowed per workout.")
                return prev
            }            
            return [...prev,ex];
        })
    }

    const handleEditExercise =(indx,key,value)=>
    {
        setExercises((prev)=>
        {
            return prev.map((ex,i)=>
            {
                if(i!==indx) return ex

                const error=validateSpecificExercise(key,value);
                return {
                    ...ex,
                    [key]:value,
                    errors:{
                        ...(ex.errors || {}),
                        [key]:error
                    }
                    
                }
            })         
    })}


    const handlesDeleteExercise=(exIndx)=>
    {
        setExerciseError("");
        setExercises(prev=>
        {
            return prev.filter((_,idx)=>idx!==exIndx)
        }
    )}

    const validateWorkout=(title,type,ex)=>
    {
        const errors= canSubmitWorkout(title,type,ex);
        setTitleError(errors.title);
        setTypeError(errors.type);
        setNullExerciseError(errors.nullExercise);
        setFormError(errors.global);    

        return  errors.isValid;
    }

    return (
        <form onSubmit={ async (e)=>
        {
            e.preventDefault();
            if(!validateWorkout(title,type,exercises)) return;

            //sanitize the data to remove errors keys from each exercise object 
            const sanitizedExercises= exercises.map((ex)=>
            {
                const {error, ...cleanExercise} =ex;
                
                return {
                        ...cleanExercise,
                        name: cleanExercise.name?.trim()
            }           })

            const workoutPayload = {
                title: title.trim(),
                type,
                exercises:sanitizedExercises
            };

            try {
                setServerMessage("");
                if (isLog)
                {
                    const response = await authRequest("post",API_BASE_URL+ENDPOINTS.POST_WORKOUT,workoutPayload);
                    handleAddWorkoutToList(response.data,"log");
                    setServerMessage(response?.data?.message || "Workout Logged Successfully");
                    onClose();
                    popupset("log")
                }
                else if(isEdit)
                {
                    const response = await authRequest("put",API_BASE_URL+ENDPOINTS.PUT_WORKOUT+workoutId,workoutPayload);
                    handleAddWorkoutToList(response.data,"edit");
                    setServerMessage(response?.data?.message || "Workout Updated Successfully");
                    onClose();
                     popupset("edit")
                }

            }catch(error)
            {
                console.log("failed", error)
                setServerMessage( error.data||"Something went wrong")
            }
        }
        }>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl">

                {/* Header */}
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                    Workout Details
                </h2>

                {/* Title & Type */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                        <label className="w-40 text-gray-700 font-semibold">Workout Title</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={title}
                            disabled={isView}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {/*Workout Title Error */}
                    {titleError && (
                        <p className="text-red-500">{titleError}</p>
                    )}

                    <div className="flex items-center gap-3">
                        <label className="w-40 text-gray-700 font-semibold">Workout Type</label>
                        <select
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={type}
                            disabled={isView}
                            onChange={(e) => setType(e.target.value)}
                        >
                        <option value="">Select workout type</option>
                        {WORKOUT_TYPES.map((w)=>(
                            <option key={w} value={w}>{w}</option>
                        ))}
                        </select>
                    </div>

                    {/*Workout Type Error */}
                    {typeError && (
                        <p className="text-red-500">{typeError}</p>
                    )}
                </div>

                {/*Null Exercise Error */}
                {nullExerciseError && (
                    <p className="text-red-500">{nullExerciseError}</p>
                )}

                {/**Exercise Limit Error */}
                {exerciseError &&(
                    <p className="text-red-500">{exerciseError}</p>
                )}

                {/* Exercises Section */}
                <div className="w-full">
                    <ExerciseSection
                        mode={mode}
                        exercises={exercises}
                        onAddExercise={handleAddExercise}
                        onEditExercise={handleEditExercise}
                        onDeleteExercise={handlesDeleteExercise}
                    />
                </div>

                {/* Form Submit Error */}
                {formError && (
                    <p className="text-red-500 mt-5">{formError}</p>
                )}

                {/*Server Error */}
                {serverMessage &&(
                    <p className="text-red-500 mt-5">{serverMessage}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    {!isView && (
                        <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            {isEdit ? "Update Workout" : "Log Workout"}
                        </button>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ✕
                </button>

            </div>
        </div>
        </form>
    );
}

export default WorkoutModal;
