import { useState } from "react";
import ExerciseSection from "./ExerciseSection";
import { validateSpecificExercise, canSubmitWorkout } from "../utils/validators";
import authRequest from "../utils/authRequest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";

// WorkoutModal handles logging, editing, and viewing workout details
// Props:
// - open: controls modal visibility
// - mode: determines behavior ("log", "edit", "view")
// - data: existing workout data (used in edit/view modes)
// - onClose: function to close the modal
// - handleAddEditDeleteWorkoutToList: syncs changes with parent workout list
// - popupset: triggers success popup after log/edit
function WorkoutModal({ open, mode, data, onClose, handleAddEditDeleteWorkoutToList, popupset }) {

    // Do not render modal if it is not open
    if (!open) return null;

    // Local state for workout-level fields
    const [title, setTitle] = useState(data?.title || "");
    const [type, setType] = useState(data?.type || "");
    const [exercises, setExercises] = useState(data?.exercises || []);

    // State for validation and server feedback messages
    const [exerciseError, setExerciseError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [formError, setFormError] = useState("");
    const [nullExerciseError, setNullExerciseError] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    // Workout ID used during edit mode
    const workoutId = data?._id;

    // Mode helpers for conditional rendering and logic
    const isView = mode === "view";
    const isEdit = mode === "edit";
    const isLog  = mode === "log";

    // Supported workout types for dropdown selection
    const WORKOUT_TYPES = [
        "strength",
        "Cardio",
        "HIT",
        "yoga",
        "other"
    ];

    // Adds a new exercise while enforcing a maximum limit
    const handleAddExercise = (ex) => {
        setExercises((prev) => {
            if (prev.length >= 20) {
                setExerciseError("Exercise limit reached. Only 20 exercises are allowed per workout.");
                return prev;
            }
            return [...prev, ex];
        });
    };

    // Updates a specific field of an exercise and validates it
    const handleEditExercise = (indx, key, value) => {
        setExercises((prev) => {
            return prev.map((ex, i) => {
                if (i !== indx) return ex;

                const error = validateSpecificExercise(key, value);
                return {
                    ...ex,
                    [key]: value,
                    errors: {
                        ...(ex.errors || {}),
                        [key]: error
                    }
                };
            });
        });
    };

    // Removes an exercise from the list
    const handlesDeleteExercise = (exIndx) => {
        setExerciseError("");
        setExercises((prev) => {
            return prev.filter((_, idx) => idx !== exIndx);
        });
    };

    // Validates the entire workout before submission
    const validateWorkout = (title, type, ex) => {
        const errors = canSubmitWorkout(title, type, ex);
        setTitleError(errors.title);
        setTypeError(errors.type);
        setNullExerciseError(errors.nullExercise);
        setFormError(errors.global);

        return errors.isValid;
    };

    return (
        // Form wrapper handles submission logic for log/edit modes
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!validateWorkout(title, type, exercises)) return;

                // Sanitize exercises by removing error-related fields
                const sanitizedExercises = exercises.map((ex) => {
                    const { error, ...cleanExercise } = ex;

                    return {
                        ...cleanExercise,
                        name: cleanExercise.name?.trim()
                    };
                });

                // Payload sent to backend API
                const workoutPayload = {
                    title: title.trim(),
                    type,
                    exercises: sanitizedExercises
                };

                try {
                    setServerMessage("");

                    // Log workout
                    if (isLog) {
                        const response = await authRequest(
                            "post",
                            API_BASE_URL + ENDPOINTS.POST_WORKOUT,
                            workoutPayload
                        );
                        handleAddEditDeleteWorkoutToList(response.data, "log");
                        setServerMessage(response?.data?.message || "Workout Logged Successfully");
                        onClose();
                        popupset("log");
                    }
                    // Edit workout
                    else if (isEdit) {
                        const response = await authRequest(
                            "put",
                            API_BASE_URL + ENDPOINTS.PUT_WORKOUT + workoutId,
                            workoutPayload
                        );
                        handleAddEditDeleteWorkoutToList(response.data, "edit");
                        setServerMessage(response?.data?.message || "Workout Updated Successfully");
                        onClose();
                        popupset("edit");
                    }

                } catch (error) {
                    console.log("failed", error);
                    setServerMessage(error.data || "Something went wrong");
                }
            }}
        >
            {/* Modal overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl">

                    {/* Modal header */}
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                        Workout Details
                    </h2>

                    {/* Title and type inputs */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <label className="w-40 text-gray-700 font-semibold">Workout Title</label>
                            <input
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                value={title}
                                disabled={isView}
                                onChange={(e) => {setTitle(e.target.value); setTitleError("");}}
                            />
                        </div>

                        {/* Workout title validation error */}
                        {titleError && (
                            <p className="text-red-500">{titleError}</p>
                        )}

                        <div className="flex items-center gap-3">
                            <label className="w-40 text-gray-700 font-semibold">Workout Type</label>
                            <select
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                value={type}
                                disabled={isView}
                                onChange={(e) => {setType(e.target.value);  setTypeError("")}}
                            >
                                <option value="">Select workout type</option>
                                {WORKOUT_TYPES.map((w) => (
                                    <option key={w} value={w}>{w}</option>
                                ))}
                            </select>
                        </div>

                        {/* Workout type validation error */}
                        {typeError && (
                            <p className="text-red-500">{typeError}</p>
                        )}
                    </div>

                    {/* No-exercise validation error */}
                    {nullExerciseError && (
                        <p className="text-red-500">{nullExerciseError}</p>
                    )}

                    {/* Exercise count limit error */}
                    {exerciseError && (
                        <p className="text-red-500">{exerciseError}</p>
                    )}

                    {/* Exercises list section */}
                    <div className="w-full">
                        <ExerciseSection
                            mode={mode}
                            exercises={exercises}
                            onAddExercise={handleAddExercise}
                            onEditExercise={handleEditExercise}
                            onDeleteExercise={handlesDeleteExercise}
                        />
                    </div>

                    {/* Form-level validation error */}
                    {formError && (
                        <p className="text-red-500 mt-5">{formError}</p>
                    )}

                    {/* Server response message */}
                    {serverMessage && (
                        <p className="text-red-500 mt-5">{serverMessage}</p>
                    )}

                    {/* Submit button (hidden in view mode) */}
                    <div className="flex justify-center mt-8">
                        {!isView && (
                            <button
                                type="submit"
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                {isEdit ? "Update Workout" : "Log Workout"}
                            </button>
                        )}
                    </div>

                    {/* Close modal button */}
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
