import { useState } from "react";
import ExerciseSection from "./ExerciseSection";

function WorkoutModal({ open, mode, data, onClose }) {
    if (!open) return null;

    const [title, setTitle] = useState(data?.title || "");
    const [type, setType] = useState(data?.type || "");
    const [exercises, setExercises] = useState(data?.exercises || []);

    const isView = mode === "view";
    const isEdit = mode === "edit";
    const isLog  = mode === "log";

    return (
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

                    <div className="flex items-center gap-3">
                        <label className="w-40 text-gray-700 font-semibold">Workout Type</label>
                        <input
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            value={type}
                            disabled={isView}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                </div>

                {/* Exercises Section */}
                <div className="w-full">
                    <ExerciseSection
                        mode={mode}
                        exercises={exercises}
                        setExercises={setExercises}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    {!isView && (
                        <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
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
    );
}

export default WorkoutModal;
