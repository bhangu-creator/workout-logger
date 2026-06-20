import { useState } from "react";
import { validateExercise } from "../utils/validators";

function AddExerciseSection({ resetForm, onAddExercise }) {
    const [formData, setFormData] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        kcalBurned: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = validateExercise(
            formData.name,
            formData.sets,
            formData.reps,
            formData.weight,
            formData.duration,
            formData.kcalBurned
        );
        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;
    };

    const handleClear = () => {
        setFormData({
            name: "",
            sets: "",
            reps: "",
            weight: "",
            duration: "",
            kcalBurned: ""
        });

        setErrors({});
    };

    return (
        <div className="w-full space-y-6" data-testid="add-exercise-section">
            <div
                className="border border-gray-300 rounded-lg pt-8 px-4 p-4 shadow-sm bg-white relative"
                data-testid="add-exercise-card"
            >
                {/* NAME */}
                <div
                    className="flex items-center gap-3 mb-3"
                    data-testid="add-exercise-name-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-name"
                        data-testid="add-exercise-name-label"
                    >
                        Name
                    </label>
                    <input
                        id="add-exercise-name"
                        data-testid="add-exercise-name"
                        value={formData.name}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, name: e.target.value }));
                            const exname = "exname";
                            if (errors[exname]) {
                                setErrors((prev) => ({ ...prev, [exname]: "" }));
                            }
                        }}
                    />
                </div>
                {errors.exname && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-name-error"
                    >
                        {errors.exname}
                    </p>
                )}

                {/* SETS */}
                <div
                    className="flex items-center gap-3 mb-3"
                    data-testid="add-exercise-sets-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-sets"
                        data-testid="add-exercise-sets-label"
                    >
                        Sets
                    </label>
                    <input
                        id="add-exercise-sets"
                        data-testid="add-exercise-sets"
                        value={formData.sets}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, sets: e.target.value }));
                            const sets = "sets";
                            if (errors[sets]) {
                                setErrors((prev) => ({ ...prev, [sets]: "" }));
                            }
                        }}
                    />
                </div>
                {errors.sets && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-sets-error"
                    >
                        {errors.sets}
                    </p>
                )}

                {/* REPS */}
                <div
                    className="flex items-center gap-3 mb-3"
                    data-testid="add-exercise-reps-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-reps"
                        data-testid="add-exercise-reps-label"
                    >
                        Reps
                    </label>
                    <input
                        id="add-exercise-reps"
                        data-testid="add-exercise-reps"
                        value={formData.reps}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, reps: e.target.value }));
                            const reps = "reps";
                            if (errors[reps]) {
                                setErrors((prev) => ({ ...prev, [reps]: "" }));
                            }
                        }}
                    />
                </div>
                {errors.reps && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-reps-error"
                    >
                        {errors.reps}
                    </p>
                )}

                {/* WEIGHT */}
                <div
                    className="flex items-center gap-3 mb-3"
                    data-testid="add-exercise-weight-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-weight"
                        data-testid="add-exercise-weight-label"
                    >
                        Weight
                    </label>
                    <input
                        id="add-exercise-weight"
                        data-testid="add-exercise-weight"
                        value={formData.weight}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        placeholder="in kgs"
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                weight: e.target.value
                            }));
                            const weight = "weight";
                            if (errors[weight]) {
                                setErrors((prev) => ({ ...prev, [weight]: "" }));
                            }
                        }}
                    />
                </div>
                {errors.weight && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-weight-error"
                    >
                        {errors.weight}
                    </p>
                )}

                {/* DURATION */}
                <div
                    className="flex items-center gap-3 mb-3"
                    data-testid="add-exercise-duration-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-duration"
                        data-testid="add-exercise-duration-label"
                    >
                        Duration
                    </label>
                    <input
                        id="add-exercise-duration"
                        data-testid="add-exercise-duration"
                        value={formData.duration}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        placeholder="in minutes"
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                duration: e.target.value
                            }));
                            const duration = "duration";
                            if (errors[duration]) {
                                setErrors((prev) => ({ ...prev, [duration]: "" }));
                            }
                        }}
                    />
                </div>
                {errors.duration && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-duration-error"
                    >
                        {errors.duration}
                    </p>
                )}

                {/* KCAL */}
                <div
                    className="flex items-center gap-3"
                    data-testid="add-exercise-calories-field"
                >
                    <label
                        className="w-32 text-gray-700 font-semibold"
                        htmlFor="add-exercise-calories"
                        data-testid="add-exercise-calories-label"
                    >
                        Calories
                    </label>
                    <input
                        id="add-exercise-calories"
                        data-testid="add-exercise-calories"
                        value={formData.kcalBurned}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                        placeholder="in kcal"
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                kcalBurned: e.target.value
                            }));
                            const calories = "calories";
                            if (errors[calories]) {
                                setErrors((prev) => ({
                                    ...prev,
                                    [calories]: ""
                                }));
                            }
                        }}
                    />
                </div>
                {errors.calories && (
                    <p
                        className="text-red-500"
                        data-testid="add-exercise-calories-error"
                    >
                        {errors.calories}
                    </p>
                )}

                <div
                    className="flex justify-center gap-10 mt-5"
                    data-testid="add-exercise-actions"
                >
                    <button
                        data-testid="clear-exercise-button"
                        type="button"
                        className="px-1 py-1 bg-gray-500 rounded-lg text-white hover:bg-gray-600"
                        onClick={handleClear}
                    >
                        Clear Feilds
                    </button>
                    <button
                        data-testid="log-exercise-button"
                        type="button"
                        className="px-1 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => {
                            if (!validateForm()) return;
                            onAddExercise(formData);
                            resetForm();
                        }}
                    >
                        Log Exercise
                    </button>
                    <button
                        data-testid="close-exercise-button"
                        type="button"
                        className="px-1 py-1 bg-gray-500 rounded-lg text-white hover:bg-gray-600"
                        onClick={resetForm}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddExerciseSection;