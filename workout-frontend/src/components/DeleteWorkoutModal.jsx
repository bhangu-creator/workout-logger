import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import authRequest from "../utils/authRequest";

// DeleteWorkoutModal is a confirmation modal shown before deleting a workout
// Props:
// - workoutId: ID of the workout to be deleted
// - chooseDelete: function to close this modal
// - popupset: function to trigger the success popup after deletion
// - handleAddEditDeleteWorkoutToList: updates the parent workout list after delete
function DeleteWorkoutModal({ workoutId, chooseDelete, popupset, handleAddEditDeleteWorkoutToList }) {
    
    // Local state to store and display any deletion error message
    const [errorMessage, setErrorMessage] = useState("");

    return (
        // Full-screen overlay to block background interaction
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                
            {/* Modal container */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-100 text-center">
                
                {/* Confirmation message */}
                <div>
                    <h2>Are you sure you want to delete this Workout?</h2>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center mt-5 gap-10">
                    
                    {/* Cancel button closes the delete modal */}
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-150"
                        onClick={() => chooseDelete()}
                    >
                        Cancel
                    </button>

                    {/* Delete button triggers API call to delete the workout */}
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-80 transition-all duration-150"
                        onClick={async () => {
                            try {
                                // Send delete request to backend
                                const response = await authRequest(
                                    "delete",
                                    API_BASE_URL + ENDPOINTS.DELETEWORKOUT + workoutId
                                );

                                // Close modal after successful deletion
                                chooseDelete();

                                // Trigger success popup
                                popupset("delete");

                                // Update workout list in parent component
                                handleAddEditDeleteWorkoutToList(workoutId, "delete");
                            } catch (error) {
                                console.error(error);
                                // Show error message if deletion fails
                                setErrorMessage("Something Went Wrong! Please Refresh");
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>

                {/* Error message shown if delete API call fails */}
                {errorMessage && (
                    <div className="mt-4">
                        <p className="text-red-500">{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DeleteWorkoutModal;
