import { useState } from "react";
import AddExerciseSection from "./AddExerciseSection";

// ExerciseSection renders the list of exercises for a workout
// It supports view, add, edit, and delete modes based on the `mode` prop
function ExerciseSection({ mode, exercises, onAddExercise, onEditExercise, onDeleteExercise }) {

    // Determines whether the section is in read-only (view) mode
    const isView = mode == "view";

    // Controls visibility of the "Add Exercise" form
    const [showform, setshowform] = useState(false);

    return (
        // Main container for the exercises section
        <div className="w-full space-y-6">

            {/* Header row with title and Add Exercise button */}
            <div className="flex items-center relative">
                <div className="flex-1"></div>

                {/* Section title */}
                <h1 className="text-xl font-semibold text-gray-700 text-center flex-1">
                    Exercises
                </h1>

                {/* Add Exercise button (hidden in view mode) */}
                <div className="flex-1 flex justify-end">
                    {!isView && (
                        <button
                            type="button"
                            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md 
                             hover:bg-red-600 transition shadow-sm"
                            onClick={() => { setshowform(true) }}
                        >
                            Add Exercise
                        </button>
                    )}
                </div>
            </div>

            {/* Add Exercise form section (shown conditionally) */}
            {showform && (
                <AddExerciseSection
                    resetForm={() => setshowform(false)}
                    onAddExercise={onAddExercise}
                />
            )}

            {/* Spacer / placeholder */}
            <div></div>

            {/* Render each exercise entry */}
            {exercises.map((ex, indx) => (
                <div
                    key={indx}
                    className="border border-gray-300 rounded-lg pt-8 px-4 p-4 shadow-sm bg-white relative"
                >
                    {/* Delete button for an exercise (hidden in view mode) */}
                    {!isView && (
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-red-500 hover:text-red-700"
                            onClick={() => onDeleteExercise(indx)}
                        >
                            Delete
                        </button>
                    )}

                    {/* Exercise Name field */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Name</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.name || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "name", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for name */}
                    {ex.errors?.name && (
                        <p className="text-red-500">{ex.errors.name}</p>
                    )}

                    {/* Sets field */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Sets</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.sets || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "sets", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for sets */}
                    {ex.errors?.sets && (
                        <p className="text-red-500">{ex.errors.sets}</p>
                    )}

                    {/* Reps field */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Reps</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.reps || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "reps", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for reps */}
                    {ex.errors?.reps && (
                        <p className="text-red-500">{ex.errors.reps}</p>
                    )}

                    {/* Weight field */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Weight</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.weight || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "weight", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for weight */}
                    {ex.errors?.weight && (
                        <p className="text-red-500">{ex.errors.weight}</p>
                    )}

                    {/* Duration field */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="w-32 text-gray-700 font-semibold">Duration</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.duration || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "duration", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for duration */}
                    {ex.errors?.duration && (
                        <p className="text-red-500">{ex.errors.duration}</p>
                    )}

                    {/* Calories burned field */}
                    <div className="flex items-center gap-3">
                        <label className="w-32 text-gray-700 font-semibold">Calories</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.kcalBurned || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "kcalBurned", e.target.value)
                            }}
                        />
                    </div>

                    {/* Display validation error for calories */}
                    {ex.errors?.kcalBurned && (
                        <p className="text-red-500">{ex.errors.kcalBurned}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ExerciseSection;
