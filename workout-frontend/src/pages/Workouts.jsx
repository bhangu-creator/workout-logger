import { useState } from "react";
import LogoHeader from "./LogoHeader"
import WorkoutsList from "./WorkoutsList";

function Workouts()
{

    const [searchText, setSearchText] = useState("");


    return (

        <div className="min-h-screen bg-gray-100 relative">
            <LogoHeader mode="inline" />
            <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-4 px-[170px]">
                    <input  value={searchText} type="text" placeholder="Search Workouts" className="border border-gray-300 px-2 py-1 rounded" onChange={(e)=>setSearchText(e.target.value)}/>
                        <button className="bg-red-500 text-white px-4 py-2 rounded ml-4">Log Workout</button>
                </div>
            </div>
            <div className="px-6 mt-6">
                <div className="w-full flex justify-center">                
            <WorkoutsList searchText={searchText}/>
            </div>
            </div>
        </div>





    )
}

export default Workouts;