import { useState } from "react";
import AddExerciseSection from "./AddExerciseSection";

// ExerciseSection renders the list of exercises for a workout
// It supports view, add, edit, and delete modes based on the `mode` prop
function ExerciseSection({
    mode,
    exercises,
    onAddExercise,
    onEditExercise,
    onDeleteExercise
}) {
    // Determines whether the section is in read-only (view) mode
    const isView = mode == "view";

    // Controls visibility of the "Add Exercise" form
    const [showform, setshowform] = useState(false);

    return (
        // Main container for the exercises section
        <div className="w-full space-y-6" data-testid="exercise-section">
            {/* Header row with title and Add Exercise button */}
            <div
                className="flex items-center relative"
                data-testid="exercise-section-header"
            >
                <div className="flex-1"></div>

                {/* Section title */}
                <h1
                    className="text-xl font-semibold text-gray-700 text-center flex-1"
                    data-testid="exercise-section-title"
                >
                    Exercises
                </h1>

                {/* Add Exercise button (hidden in view mode) */}
                <div
                    className="flex-1 flex justify-end"
                    data-testid="exercise-section-actions"
                >
                    {!isView && (
                        <button
                            data-testid="add-exercise-button"
                            type="button"
                            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md 
                             hover:bg-red-600 transition shadow-sm"
                            onClick={() => {
                                setshowform(true);
                            }}
                        >
                            Add Exercise
                        </button>
                    )}
                </div>
            </div>

            {/* Add Exercise form section (shown conditionally) */}
            {showform && (
                <div data-testid="exercise-add-form-wrapper">
                    <AddExerciseSection
                        resetForm={() => setshowform(false)}
                        onAddExercise={onAddExercise}
                    />
                </div>
            )}

            {/* Spacer / placeholder */}
            <div data-testid="exercise-section-spacer"></div>

            {/* Render each exercise entry */}
            {exercises.map((ex, indx) => (
                <div
                    key={indx}
                    data-testid={`exercise-row-${indx}`}
                    className="border border-gray-300 rounded-lg pt-8 px-4 p-4 shadow-sm bg-white relative"
                >
                    {/* Delete button for an exercise (hidden in view mode) */}
                    {!isView && (
                        <button
                            data-testid={`delete-exercise-button-${indx}`}
                            type="button"
                            className="absolute top-2 right-3 text-red-500 hover:text-red-700"
                            onClick={() => onDeleteExercise(indx)}
                        >
                            Delete
                        </button>
                    )}

                    {/* Exercise Name field */}
                    <div
                        className="flex items-center gap-3 mb-3"
                        data-testid={`exercise-name-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-name-${indx}`}
                            data-testid={`exercise-name-label-${indx}`}
                        >
                            Name
                        </label>
                        <input
                            id={`exercise-name-${indx}`}
                            data-testid="exercise-name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.name || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "name", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for name */}
                    {ex.errors?.name && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-name-error-${indx}`}
                        >
                            {ex.errors.name}
                        </p>
                    )}

                    {/* Sets field */}
                    <div
                        className="flex items-center gap-3 mb-3"
                        data-testid={`exercise-sets-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-sets-${indx}`}
                            data-testid={`exercise-sets-label-${indx}`}
                        >
                            Sets
                        </label>
                        <input
                            id={`exercise-sets-${indx}`}
                            data-testid="exercise-sets"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.sets || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "sets", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for sets */}
                    {ex.errors?.sets && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-sets-error-${indx}`}
                        >
                            {ex.errors.sets}
                        </p>
                    )}

                    {/* Reps field */}
                    <div
                        className="flex items-center gap-3 mb-3"
                        data-testid={`exercise-reps-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-reps-${indx}`}
                            data-testid={`exercise-reps-label-${indx}`}
                        >
                            Reps
                        </label>
                        <input
                            id={`exercise-reps-${indx}`}
                            data-testid="exercise-reps"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.reps || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "reps", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for reps */}
                    {ex.errors?.reps && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-reps-error-${indx}`}
                        >
                            {ex.errors.reps}
                        </p>
                    )}

                    {/* Weight field */}
                    <div
                        className="flex items-center gap-3 mb-3"
                        data-testid={`exercise-weight-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-weight-${indx}`}
                            data-testid={`exercise-weight-label-${indx}`}
                        >
                            Weight
                        </label>
                        <input
                            id={`exercise-weight-${indx}`}
                            data-testid="exercise-weight"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.weight || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "weight", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for weight */}
                    {ex.errors?.weight && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-weight-error-${indx}`}
                        >
                            {ex.errors.weight}
                        </p>
                    )}

                    {/* Duration field */}
                    <div
                        className="flex items-center gap-3 mb-3"
                        data-testid={`exercise-duration-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-duration-${indx}`}
                            data-testid={`exercise-duration-label-${indx}`}
                        >
                            Duration
                        </label>
                        <input
                            id={`exercise-duration-${indx}`}
                            data-testid="exercise-duration"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.duration || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "duration", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for duration */}
                    {ex.errors?.duration && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-duration-error-${indx}`}
                        >
                            {ex.errors.duration}
                        </p>
                    )}

                    {/* Calories burned field */}
                    <div
                        className="flex items-center gap-3"
                        data-testid={`exercise-calories-field-${indx}`}
                    >
                        <label
                            className="w-32 text-gray-700 font-semibold"
                            htmlFor={`exercise-calories-${indx}`}
                            data-testid={`exercise-calories-label-${indx}`}
                        >
                            Calories
                        </label>
                        <input
                            id={`exercise-calories-${indx}`}
                            data-testid="exercise-calories"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={ex.kcalBurned || ""}
                            disabled={isView}
                            onChange={(e) => {
                                onEditExercise(indx, "kcalBurned", e.target.value);
                            }}
                        />
                    </div>

                    {/* Display validation error for calories */}
                    {ex.errors?.kcalBurned && (
                        <p
                            className="text-red-500"
                            data-testid={`exercise-calories-error-${indx}`}
                        >
                            {ex.errors.kcalBurned}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ExerciseSection;