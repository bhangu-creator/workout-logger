// WorkoutViewModal displays workout details in read-only mode
// Props:
// - data: array of workout objects to display
// - onClose: function to close the modal
function WorkoutViewModal({ data, onClose }) {
    // List of supported workout types for display in the dropdown
    const WORKOUT_TYPES = [
        "strength",
        "Cardio",
        "HIT",
        "yoga",
        "other"
    ];

    return (
        // Full-screen overlay to block background interaction
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-testid="workout-view-modal-overlay"
        >
            {/* Modal container */}
            <div
                className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
                data-testid="workout-view-modal"
            >
                {/* Modal header */}
                <h2
                    className="text-center text-2xl font-bold text-gray-800 mb-6 text-red-500"
                    data-testid="workout-view-modal-heading"
                >
                    Workout Details
                </h2>

                {/* Render each workout passed in data */}
                {data.map((w, workoutIndex) => (
                    <div
                        key={workoutIndex}
                        data-testid={`workout-view-item-${workoutIndex}`}
                    >
                        {/* Workout title and type (read-only) */}
                        <div
                            className="space-y-4 mb-6"
                            data-testid={`workout-view-details-${workoutIndex}`}
                        >
                            <div
                                className="flex items-center gap-3"
                                data-testid={`workout-view-title-field-${workoutIndex}`}
                            >
                                <label
                                    className="w-40 text-gray-700 font-semibold"
                                    data-testid={`workout-view-title-label-${workoutIndex}`}
                                >
                                    Workout Title
                                </label>
                                <input
                                    data-testid={`workout-view-title-input-${workoutIndex}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                    value={w.title || ""}
                                    disabled={true}
                                />
                            </div>

                            <div
                                className="flex items-center gap-3"
                                data-testid={`workout-view-type-field-${workoutIndex}`}
                            >
                                <label
                                    className="w-40 text-gray-700 font-semibold"
                                    data-testid={`workout-view-type-label-${workoutIndex}`}
                                >
                                    Workout Type
                                </label>
                                <select
                                    data-testid={`workout-view-type-select-${workoutIndex}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                    value={w.type || ""}
                                    disabled={true}
                                >
                                    <option value="">Select workout type</option>
                                    {WORKOUT_TYPES.map((type) => (
                                        <option
                                            key={type}
                                            value={type}
                                            data-testid={`workout-view-type-option-${type.toLowerCase()}`}
                                        >
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Exercises section */}
                        <div
                            className="w-full"
                            data-testid={`workout-view-exercises-section-${workoutIndex}`}
                        >
                            <div className="w-full space-y-6">
                                <div
                                    className="flex items-center"
                                    data-testid={`workout-view-exercises-header-${workoutIndex}`}
                                >
                                    <div className="flex"></div>

                                    {/* Exercises section title */}
                                    <h1
                                        className="text-xl font-semibold text-red-500 text-center flex-1"
                                        data-testid={`workout-view-exercises-title-${workoutIndex}`}
                                    >
                                        Exercises
                                    </h1>
                                </div>

                                {/* ========= Exercise List ========= */}
                                {w.exercises.map((ex, exerciseIndex) => (
                                    <div
                                        key={exerciseIndex}
                                        className="border border-gray-300 rounded-lg pt-8 px-4 p-4 shadow-sm bg-white relative"
                                        data-testid={`workout-view-exercise-row-${workoutIndex}-${exerciseIndex}`}
                                    >
                                        {/* Exercise name */}
                                        <div
                                            className="flex items-center gap-3 mb-3"
                                            data-testid={`workout-view-exercise-name-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-name-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Name
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-name-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.name || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Sets */}
                                        <div
                                            className="flex items-center gap-3 mb-3"
                                            data-testid={`workout-view-exercise-sets-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-sets-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Sets
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-sets-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.sets || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Reps */}
                                        <div
                                            className="flex items-center gap-3 mb-3"
                                            data-testid={`workout-view-exercise-reps-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-reps-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Reps
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-reps-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.reps || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Weight */}
                                        <div
                                            className="flex items-center gap-3 mb-3"
                                            data-testid={`workout-view-exercise-weight-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-weight-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Weight
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-weight-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.weight || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Duration */}
                                        <div
                                            className="flex items-center gap-3 mb-3"
                                            data-testid={`workout-view-exercise-duration-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-duration-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Duration
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-duration-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.duration || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Calories burned */}
                                        <div
                                            className="flex items-center gap-3"
                                            data-testid={`workout-view-exercise-calories-field-${workoutIndex}-${exerciseIndex}`}
                                        >
                                            <label
                                                className="w-32 text-gray-700 font-semibold"
                                                data-testid={`workout-view-exercise-calories-label-${workoutIndex}-${exerciseIndex}`}
                                            >
                                                Calories
                                            </label>
                                            <input
                                                data-testid={`workout-view-exercise-calories-${workoutIndex}-${exerciseIndex}`}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.kcalBurned || ""}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Close modal button */}
                <button
                    data-testid="workout-view-close-button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default WorkoutViewModal;