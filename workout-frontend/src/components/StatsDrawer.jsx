function StatsDrawer({onclose,isOpen})
{

    return (
        <>

        {isOpen &&(
    
       <div className="fixed inset-0 bg-black bg-opacity-40 z-40" 
       onClick={onclose}></div>
       )}

        <div className={`fixed top-0 right-0 h-screen w-80 bg-gray-300 border-l border-gray-300 shadow-lg shadow-xl bg-opacity-80 z-50 shadow-lg
          transform transition-transform duration-300 ease-out
           ${isOpen? "translate-x-0": "translate-x-full"}`}>

            <div className="items-center mt-[200px] divide-y divide-gray-200">
                <div className=" bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium"
                onClick={()=> {window.open("/workoutsByType","_blank")
                    onclose();
                }}>View Workouts by Type</div>
                <div className=" bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium">View Workouts Trend</div>
                <div className=" bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium">View Personal Records</div>
            </div>

        </div>
        </>
    )
}

export default StatsDrawer;