
import getUserDetails from "../utils/userDetails";
import { useNavigate } from "react-router-dom";

function TopRightUser()
{
    const navigate = useNavigate();
    const {username} =getUserDetails();
    return (
        <div className="flex items-center gap-4 mt-5 mr-4 mb-2 whitespace-nowrap">
        <span className="text-grey-800 font-medium">{username}</span>
        <button className="font-medium text-red-500 hover:text-red-700" type="button"
        onClick={()=>
        {
            localStorage.removeItem("token");
            navigate("/login");
            
        }
        }>Log out</button>
        </div>

    )
}

export default TopRightUser;