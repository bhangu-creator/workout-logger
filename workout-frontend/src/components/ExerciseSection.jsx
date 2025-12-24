import { useState } from "react";
import AddExerciseSection from "./AddExerciseSection";

function ExerciseSection({ mode, exercises, onAddExercise, onEditExercise, onDeleteExercise}) {

    const isView = mode == "view";
    const [showform,setshowform] = useState(false);

    return (
        
        <div className="w-full space-y-6">
            <div className="flex items-center relative">
                <div className="flex-1"></div>
            <h1 className="text-xl font-semibold text-gray-700 text-center flex-1">
                Exercises
            </h1>
            <div className="flex-1 flex justify-end">
            {!isView &&(
                <button type="button" className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md 
                     hover:bg-red-600 transition shadow-sm" onClick={()=>{setshowform(true)}}>Add Exercise</button>
            )}  
            </div>
            {/*ADD EXERCISE SECTION */}
            </div>
            { showform && (
                <AddExerciseSection resetForm={()=>setshowform(false)} onAddExercise={onAddExercise}></AddExerciseSection>

            )}
                

            <div>

            </div>
            {exercises.map((ex, indx) => (
                <div 
                    key={indx} 
                    className="border border-gray-300 rounded-lg  pt-8 px-4 p-4 shadow-sm bg-white relative"
                >
                    {/*DELETE ICON */}
                    {!isView && 
                    (
                        <button className="absolute top-2 right-3 text-red-500 hover:text-red-700 " onClick={()=>onDeleteExercise(indx)}>Delete</button>
                    )}
                    {/* NAME */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Name</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.name || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"name",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for name */}
                    { ex.errors?.name && (
                        <p className="text-red-500">{ex.errors.name}</p>
                    )}

                    {/* SETS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Sets</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.sets || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"sets",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for sets */}
                    { ex.errors?.sets && (
                        <p className="text-red-500">{ex.errors.sets}</p>
                    )}

                    {/* REPS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Reps</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.reps || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"reps",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for reps */}
                    { ex.errors?.reps && (
                        <p className="text-red-500">{ex.errors.reps}</p>
                    )}

                    {/* WEIGHT */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Weight</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.weight || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"weight",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for weight */}
                    { ex.errors?.weight && (
                        <p className="text-red-500">{ex.errors.weight}</p>
                    )}

                    {/* DURATION */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Duration</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.duration || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"duration",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for duration */}
                    { ex.errors?.duration && (
                        <p className="text-red-500">{ex.errors.duration}</p>
                    )}

                    {/* KCAL */}
                    <div className="flex items-center gap-3">
                        <label className="w-32 text-gray-700 font-semibold">Calories</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.kcalBurned || ""}
                            disabled={isView}
                            onChange={(e)=>
                            {
                                onEditExercise(indx,"kcalBurned",e.target.value,)
                            }
                            }
                        />
                    </div>
                    {/*displaying error for calories */}
                    { ex.errors?.kcalBurned && (
                        <p className="text-red-500">{ex.errors.kcalBurned}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ExerciseSection;
