function AddEditPopUpModal({onClose,mode})
{
    const isLog = mode=="log";
    const isEdit = mode=="edit";
    const isDelete= mode=="delete"

    return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                
            <div className="bg-white p-6 rounded-lg shadow-xl w-100 text-center">
                <div>
                {isLog && (
                    <h2 className="text-lg font-semibold text-gray-800">Workout Logged Successfully!!!</h2>
                )}
                {isEdit && (
                    <h2 className="text-lg font-semibold text-gray-800">Workout Updated Successfully!!!</h2>
                )}
                {isDelete && (
                    <h2 className="text-lg font-semibold text-gray-800">Workout Deleted Successfully!!!</h2>
                )}
                </div>
                <div className="flex justify-center mt-5">
                    <button type="button" className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                    onClick={onClose}>OK</button>
                </div>
                </div>
                </div>
    )
}

export default AddEditPopUpModal;