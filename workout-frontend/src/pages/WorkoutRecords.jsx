import LogoHeader from "../components/LogoHeader";
import TopRightUser from "../components/TopRightUser";
import { useState, useEffect } from "react";
import authRequest from "../utils/authRequest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import {formatEveryDuration,formatDate} from "../utils/validators";
import WorkoutViewModal from "../components/WorkoutViewModal";


function WorkoutRecords() {


    //states to store the backend respone
    const [achievementsData,setAchievementsData]= useState([]);
    const [milestonesData,setMilestonesData]= useState([]);
    const [recordsData,setRecordsData]= useState([]);
    const [durationWorkout, setDurationWorkout] = useState([]);
    const [caloriesWorkout, setCaloriesWorkout] = useState([]);
    const [modalData,setModalData]= useState([]);
    const [ showModal, setShowModal] = useState(false);
    const [loading,setLoading] =useState(true);

    //state to store the backend errors
    const [serverError,setServerError] = useState("");

    useEffect(()=>
    {
        async function getRecordsData()
        {
            try{
                setServerError("");
                const response = await authRequest("get",API_BASE_URL+ENDPOINTS.GET_WORKOUTS_RECORDS);
                setAchievementsData(response?.data?.achievements ?? null );
                setMilestonesData(response?.data?.milestones ?? []);
                setRecordsData(response?.data?.records ?? null)
                setDurationWorkout(response?.data?.achievements?.duration?.workout ?? []);
                setCaloriesWorkout(response?.data?.achievements?.calories?.workout ?? []);

            }catch (error)
            {
                console.error(error);
                setServerError("Something Went Wrong!!");

            }finally{
              setLoading(false);
            }

        }

        getRecordsData();

    },[]);
    
    //loading the records
    if(loading)
    {
      return (
        <div className="text-lg text-gray-800 format-semibold">Loading Records....</div>
      )
    }

    //No records Found
    if(serverError)
    {
      return (
        <div className="text-xl text-red-500 format-semibold ml-2 mt-4">{serverError}</div>
      )
    }

    //formatting all the dates used in this page

    const allDurations ={maxDuration : achievementsData?.duration?.durationRecord ?? 0,
                                      totalDuration : milestonesData[0]?.totalduration ?? 0,
                                      averageDuration :milestonesData[0]?.avgDuration ?? 0,
                                      activeDayDuration : recordsData?.mostActiveDay[0]?.totalDuration ?? 0,
                                      activeWeekDuration :  recordsData?.mostActiveWeek[0]?.totalDuration ?? 0}
    
    const allDurationsFormatted= formatEveryDuration(allDurations);

    //formating the date to str value
    const activeDay=recordsData?.mostActiveDay[0]?.date ?? 0
    const activeDayStrs=formatDate(activeDay);

    //workout modal open function
    const openWorkoutModal = (data)=>
    {

      setShowModal(true);
      setModalData(data);

    }

    
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6">
        <LogoHeader mode="inline" />
        <TopRightUser />
      </div>

      {/*View Workout Modal **/}
        {showModal && (
        <WorkoutViewModal data={modalData} onClose={()=>setShowModal(false)}></WorkoutViewModal>
      )}

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">

          {/* Title */}
          <div className="flex justify-center mt-4">
            <h2 className="text-4xl font-bold text-gray-800">
              Personal Records
            </h2>
          </div>

          {/* ========== ACHIEVEMENTS ========== */}
          <div className="mt-10 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800">
            Workout Achievements
          </div>

          <div className="flex justify-center gap-12 mt-12">
            {/* Max Duration */}
            <div className="bg-gray-100 min-h-[250px] min-w-[300px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
            onClick={()=>openWorkoutModal(durationWorkout)}>
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-center mt-6">
                  Max Duration of Workout
                </div>
                <div className="text-5xl font-semibold text-center mt-6 text-red-500">
                  {allDurationsFormatted.maxDuration}
                </div>
                <div className="text-sm text-gray-500 text-center mt-6 hover:text-gray-800">
                  Click to view workout details
                </div>
              </div>
            </div>

            {/* Max Calories */}
            <div className="bg-gray-100 min-h-[250px] min-w-[300px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
            onClick={()=>openWorkoutModal(caloriesWorkout)}>
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-center mt-6">
                  Max Calories Burned in Workout
                </div>
                <div className="text-5xl font-semibold text-center mt-6 text-red-500">
                  {achievementsData?.calories?.kcalRecord ?? 0} kcal
                </div>
                <div className="text-sm text-gray-500 text-center mt-6 hover:text-gray-800">
                  Click to view workout details
                </div>
              </div>
            </div>
          </div>

          {/* ========== STREAKS ========== */}
          <div className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800">
            Streaks
          </div>

          <div className="flex justify-center gap-12 mt-12">
            <div className="bg-gray-100 min-h-[250px] min-w-[300px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]">
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-center mt-6">
                  Current Streak
                </div>
                <div className="text-5xl font-semibold text-center mt-6 text-red-500">
                  {achievementsData?.streaks?.current ?? 0} days
                </div>
              </div>
            </div>

            <div className="bg-gray-100 min-h-[250px] min-w-[300px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]">
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-center mt-6">
                  Longest Streak
                </div>
                <div className="text-5xl font-semibold text-center mt-6 text-red-500">
                  {achievementsData?.streaks?.longest ?? 0} days
                </div>
              </div>
            </div>
          </div>

          {/* ========== MILESTONES ========== */}
          <div className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800">
            Milestones
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {[
              ["Total Workouts Logged",milestonesData[0]?.totalWorkouts ?? 0],
              ["Total Calories Burned", milestonesData[0]?.totalKcalBurned ?? 0],
              ["Total Duration",allDurationsFormatted.totalDuration],
              ["Average Duration", allDurationsFormatted.averageDuration],
              ["Average Calories Burned", milestonesData[0]?.avgKcalBurned ?? 0],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-gray-100 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
              >
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">{label}:</div>
                  <div className="font-semibold text-red-500">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ========== RECORDS ========== */}
          <div className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800">
            Records
          </div>

          <div className="flex justify-center gap-12 mt-12">
            {/* Most Active Day */}
            <div className="bg-gray-100 min-h-[260px] min-w-[320px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]">
              <div className="flex flex-col">
                <div className="text-xl font-semibold text-center mt-6">
                  Most Active Day
                </div>

                {[
                  ["Date", activeDayStrs?? "----"],
                  ["Exercises Logged", recordsData?.mostActiveDay[0]?.workouts ?? 0],
                  ["Total Calories", recordsData?.mostActiveDay[0]?.totalKcalBurned ?? 0],
                  ["Total Duration", allDurationsFormatted.activeDayDuration],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-center gap-2 mt-4">
                    <span className="font-semibold text-gray-700">{label}:</span>
                    <span className="font-semibold text-red-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Active Week */}
            <div className="bg-gray-100 min-h-[260px] min-w-[320px] rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]">
              <div className="flex flex-col">
                <div className="text-xl font-semibold text-center mt-6">
                  Most Active Week
                </div>

                {[
                  ["Week", recordsData?.mostActiveWeek[0]?.week ?? "----" ],
                  ["Exercises Logged", recordsData?.mostActiveWeek[0]?.workouts ?? 0],
                  ["Total Calories", recordsData?.mostActiveWeek[0]?.totalKcalBurned ?? 0],
                  ["Total Duration", allDurationsFormatted.activeWeekDuration],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-center gap-2 mt-4">
                    <span className="font-semibold text-gray-700">{label}:</span>
                    <span className="font-semibold text-red-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WorkoutRecords;
