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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl">
        
                {/* Modal header */}
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 text-red-500">
                    Workout Details
                </h2>

                {/* Render each workout passed in data */}
                {data.map((w, indx) => (
                    <div key={indx}>
            
                        {/* Workout title and type (read-only) */}
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <label className="w-40 text-gray-700 font-semibold">
                                    Workout Title
                                </label>
                                <input
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                    value={w.title || ""}
                                    disabled={true}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="w-40 text-gray-700 font-semibold">
                                    Workout Type
                                </label>
                                <select
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                    value={w.type || ""}
                                    disabled={true}
                                >
                                    <option value="">Select workout type</option>
                                    {WORKOUT_TYPES.map((w) => (
                                        <option key={w} value={w}>
                                            {w}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Exercises section */}
                        <div className="w-full">
                            <div className="w-full space-y-6">
                                <div className="flex items-center">
                                    <div className="flex"></div>

                                    {/* Exercises section title */}
                                    <h1 className="text-xl font-semibold text-red-500 text-center flex-1">
                                        Exercises
                                    </h1>
                                </div>

                                {/* ========= Exercise List ========= */}
                                {w.exercises.map((ex, indx) => (
                                    <div
                                        key={indx}
                                        className="border border-gray-300 rounded-lg pt-8 px-4 p-4 shadow-sm bg-white relative"
                                    >
                                        {/* Exercise name */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Name
                                            </label>
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.name || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Sets */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Sets
                                            </label>
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.sets || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Reps */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Reps
                                            </label>
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.reps || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Weight */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Weight
                                            </label>
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.weight || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Duration */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Duration
                                            </label>
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                                                value={ex.duration || ""}
                                                disabled={true}
                                            />
                                        </div>

                                        {/* Calories burned */}
                                        <div className="flex items-center gap-3">
                                            <label className="w-32 text-gray-700 font-semibold">
                                                Calories
                                            </label>
                                            <input
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
