// AddEditPopUpModal is a simple feedback modal shown after
// logging, editing, or deleting a workout.
//
// Props:
// - onClose: function to close the modal (usually toggles a parent state)
// - mode: string that determines which success message to show ("log", "edit", "delete")
function AddEditPopUpModal({ onClose, mode }) {
    
    // Boolean flags derived from mode to simplify conditional rendering
    const isLog = mode == "log";
    const isEdit = mode == "edit";
    const isDelete = mode == "delete";

    return (
        // Full-screen overlay
        // - fixed inset-0 covers the entire viewport
        // - semi-transparent black background to dim the page behind
        // - flex centering ensures modal is centered on screen
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                
            {/* Modal container */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-100 text-center">
                
                {/* Conditional success message based on action type */}
                <div>
                    {isLog && (
                        <h2 className="text-lg font-semibold text-gray-800">
                            Workout Logged Successfully!!!
                        </h2>
                    )}
                    {isEdit && (
                        <h2 className="text-lg font-semibold text-gray-800">
                            Workout Updated Successfully!!!
                        </h2>
                    )}
                    {isDelete && (
                        <h2 className="text-lg font-semibold text-gray-800">
                            Workout Deleted Successfully!!!
                        </h2>
                    )}
                </div>

                {/* OK button section */}
                {/* Clicking OK triggers onClose to dismiss the modal */}
                <div className="flex justify-center mt-5">
                    <button
                        type="button"
                        className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

// Exporting the modal for use after add/edit/delete actions
export default AddEditPopUpModal;
