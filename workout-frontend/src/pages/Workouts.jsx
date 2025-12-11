//importing the required components and hooks
import { useState } from "react";
import LogoHeader from "./LogoHeader"
import WorkoutsList from "./WorkoutsList";
import WorkoutModal from "./WorkoutModal";

function Workouts()
{

    //state used to store the search bar input
    const [searchText, setSearchText] = useState("");
    //state used to store what purpose of modal is needed
    const [modalMode,setModalMode] = useState("log");
    //state used to store if the modal is shown on UI or not
    const [modalView,setModalView] = useState(false);
    //state used to store the data that need to be sent to modal for view/edit
    const [modalData,setModalData]= useState(null);


    return (

        //parent div
        <div className="min-h-screen bg-gray-100 relative">
            {/*component shows the logo of app*/}
            <LogoHeader mode="inline" />
            {/* shows the log workout and search bar in line on top of the workouts list*/}
            <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-4 px-[170px]">
                    <input  value={searchText} type="text" placeholder="Search Workouts" className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500" onChange={(e)=>setSearchText(e.target.value)}/>
                        <button className="bg-red-500 text-white px-4 py-2 rounded ml-4" onClick={()=>
                            {setModalMode("log");
                            setModalData(null);
                            setModalView(true);}
                        }>Log Workout</button>
                </div>
            </div>
            {/*Workout List Component shows all the workouts along with pagination */}
            <div className="px-6 mt-6">
                <div className="w-full flex justify-center">                
            <WorkoutsList onView={(workout)=>{setModalData(workout); setModalView(true); setModalMode("view");}}
            onEdit={(workout)=>{setModalData(workout); setModalMode("edit"); setModalView(true);}} searchText={searchText}/>
            {modalView && (
                <WorkoutModal open={modalView} mode={modalMode} data={modalData} onClose={()=>setModalView(false)}></WorkoutModal>
            )}
            
            </div>
            </div>
        </div>





    )
}

//exporting the required component
export default Workouts;