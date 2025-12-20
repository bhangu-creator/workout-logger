import { useState,useEffect } from "react";

function WorkoutsList({onView,onEdit,searchText, WorkoutsData})
{


  //describes no of records to be shown on single page
  const ITEMS_PER_PAGE=10;

   //initializing a sort state for sorting the list data
    const [sortState, setSortState] = useState({
      key:null,
      direction:null
    });


    //initializing the state to store the page number
    const [curretPage,setCurrentPage] = useState(1);

    //calculating the total duration and calories 
    const transformed= WorkoutsData.map(w=>
    {
      const totalDuration= w.exercises.reduce((sum,ex)=> sum+ex.duration,0);
      const totalCalories = w.exercises.reduce((sum,ex)=>sum+ex.kcalBurned,0);

      return { ...w, totalDuration,totalCalories}

    }
    )

    //filtering the data according to the search bar value
    const text=searchText.toLowerCase();
    const filteredWorkouts  = transformed.filter(w=>
    {
      return (
        w.title.toLowerCase().includes(text)||
        w.type.toLowerCase().includes(text)||
        w.totalDuration.toString().includes(text)||
        w.totalCalories.toString().includes(text)
      );
    });


    //this function changes the sort state whenever user click the sorting button beside the list'slabel
    function handleSort(columnKey)
    {
       setSortState(prev=>
       {
        if (prev.key==columnKey)
        {
          if(prev.direction=="asc")
          {
            return {key:columnKey,direction:"desc"};
          }
          else if(prev.direction=="desc")
          { return {key:null,direction:null}; }
        }

        return {key:columnKey,direction:"asc"};
       });
    };

    //making copy of filtered data to not mutilate the original data
    const sortedData= [... filteredWorkouts];

    //sorting the data based on the sortState keys and direction
    if (sortState.key!=null)
    {
      sortedData.sort((a,b)=>
      {
        const key=sortState.key;

        let valA=a[key];
        let valB=b[key];

        if (typeof valA=="string")
        {
          valA=valA.toLowerCase();
          valB=valB.toLowerCase()
        }

        if (sortState.direction=="asc")
        {
          return valA>valB? 1: -1
        }
        else{
          return valB>valA? 1 : -1
        }
      });
    }


    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

    //if user searches and the pages change
    useEffect(()=>{
          //calculating the total pages needed 
          const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
          if (curretPage>totalPages)
          { setCurrentPage(1)}
    },[filteredWorkouts.length]); 

  //only storing the data needed for the current page number 
    const start=(curretPage-1) * ITEMS_PER_PAGE;
    const end= start+ITEMS_PER_PAGE;
    const paginationWorkouts=sortedData.slice(start,end);
    

    return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Header Row */}
      <div className="bg-gray-200 rounded-t-lg grid grid-cols-5 font-semibold text-gray-700 px-4 py-3">
        <div className="cursor-pointer select-none flex items-center gap-1" onClick={()=>handleSort("title")}> {sortState.key=="title" &&(
          <span>{sortState.direction=="asc"? "▲" : "▼"}</span>
        )}Title</div>
        <div className="cursor-pointer select-none flex items-center gap-1" onClick={()=>handleSort("type")}>Type {sortState.key=="type" &&(
          <span>{sortState.direction=="asc"? "▲" : "▼"}</span>
        )}</div>
        <div className="cursor-pointer select-none flex items-center gap-1" onClick={()=>handleSort("totalDuration")}> {sortState.key=="totalDuration" &&(
          <span>{sortState.direction=="asc"? "▲" : "▼"}</span>
        )} Total Duration</div>
        <div className="cursor-pointer select-none flex items-center gap-1" onClick={()=>handleSort("totalCalories")}> {sortState.key=="totalCalories" &&(
          <span>{sortState.direction=="asc"? "▲" : "▼"}</span>
        )} Total Calories</div>
        <div className="text-center select-none">Actions</div>
      </div>

      {/* List Rows */}
      <ul className="flex flex-col gap-2 mt-2">
        {paginationWorkouts.map(w => (
          <li
            key={w._id}
            className="grid grid-cols-5 gap-6 items-center bg-white px-4 py-3 rounded-lg shadow"
          >

            <div className="font-medium">{w.title}</div>
            <div className="text-gray-600">{w.type}</div>
            <div className="text-gray-500">{w.totalDuration} min</div>
            <div className="text-gray-500">{w.totalCalories} kcal</div>

            <div className="flex justify-end gap-3">
              <button className="text-blue-600" onClick={()=>onView(w)}>View</button>
              <button className="text-yellow-600" onClick={()=>onEdit(w)}>Edit</button>
              <button className="text-red-600">Delete</button>
            </div>

          </li>
        ))}
      </ul>
{/*showing pagination on UI */}
<div className="flex justify-center mt-6 gap-2">
  {
    Array.from({length:totalPages},(_,i)=>i+1).map(page=>(
      <button key={page} onClick={()=>setCurrentPage(page)} className={`px-3 py-1 rounded ${curretPage==page?"bg-red-500 text-gray":"bg-gray-500"}`}>{page}</button>
    ))
  }
</div>
    </div>    
  );
}

export default WorkoutsList;