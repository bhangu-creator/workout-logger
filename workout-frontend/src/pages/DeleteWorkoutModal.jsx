import { useState } from "react";
import {API_BASE_URL,ENDPOINTS} from "../api/endpoints";
import authRequest from "../utils/authRequest";

function DeleteWorkoutModal({workoutId,chooseDelete,popupset,handleAddEditDeleteWorkoutToList})
{
    const [errorMessage,setErrorMessage] =useState("");
    return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                
            <div className="bg-white p-6 rounded-lg shadow-xl w-100 text-center">
                <div>
                    <h2>Are you sure you want to delete this Workout?</h2>
                </div>
                <div className="flex justify-center mt-5 gap-10">
                    <button type="button" className="  px-4 py-2
                            rounded-md
                            border border-gray-300
                            text-gray-600
                            hover:bg-gray-100
                            hover:text-gray-800
                            transition-all duration-150" onClick={()=>chooseDelete()}>Cancel
                    </button>
                    <button type="button" className="  px-4 py-2
                            rounded-md
                            bg-red-500
                            text-white
                            font-semibold
                            hover:bg-red-600
                            active:scale-80
                            transition-all duration-150" 
                            onClick={ async ()=>{
                                try{
                                    const response=await authRequest("delete",API_BASE_URL+ENDPOINTS.DELETEWORKOUT+workoutId);
                                    chooseDelete()    
                                    popupset("delete")
                                    handleAddEditDeleteWorkoutToList(workoutId,"delete")                              
                                }catch(error)
                                { console.error(error);
                                    setErrorMessage("Something Went Wrong! Please Refresh");
                                }
                            }}>Delete
                    </button>
                </div>
                    {setErrorMessage && (
                        <div className="mt-4">
                        <p className="text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </div>
                </div>
    )

 }

export default DeleteWorkoutModal;