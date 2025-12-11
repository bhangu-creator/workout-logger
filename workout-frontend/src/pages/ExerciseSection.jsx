function ExerciseSection({ mode, exercises, setExercises }) {

    if(exercises.length==0){return}

    const isView = mode == "view";


    return (
        <div className="w-full space-y-6">
            <div className="flex items-center relative">
                <div className="flex-1"></div>
            <h1 className="text-xl font-semibold text-gray-700 text-center flex-1">
                Exercises
            </h1>
            <div className="flex-1 flex justify-end">
            {!isView &&(
                <button className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md 
                     hover:bg-red-600 transition shadow-sm">Add Exercise</button>
            )}  
            </div>
            </div>
            {exercises.map((ex, indx) => (
                <div 
                    key={indx} 
                    className="border border-gray-300 rounded-lg  pt-8 px-4 p-4 shadow-sm bg-white relative"
                >
                    {/*DELETE ICON */}
                    {!isView && 
                    (
                        <button className="absolute top-2 right-3 text-red-500 hover:text-red-700 ">Delete</button>
                    )}
                    {/* NAME */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Name</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.name || ""}
                            disabled={isView}
                        />
                    </div>

                    {/* SETS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Sets</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.sets || ""}
                            disabled={isView}
                        />
                    </div>

                    {/* REPS */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Reps</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.reps || ""}
                            disabled={isView}
                        />
                    </div>

                    {/* WEIGHT */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Weight</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.weight || ""}
                            disabled={isView}
                        />
                    </div>

                    {/* DURATION */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Duration</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.duration || ""}
                            disabled={isView}
                        />
                    </div>

                    {/* KCAL */}
                    <div className="flex items-center gap-3">
                        <label className="w-32 text-gray-700 font-semibold">Calories</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.kcalBurned || ""}
                            disabled={isView}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExerciseSection;
