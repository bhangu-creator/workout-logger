import getUserDetails from "../utils/userDetails";
import { useNavigate } from "react-router-dom";

// TopRightUser displays the logged-in user's name and a logout button
// It is typically shown in the top-right corner of the application
function TopRightUser() {

    // Hook used for programmatic navigation
    const navigate = useNavigate();

    // Retrieve user details (decoded from token)
    // Destructure username for display
    const { username } = getUserDetails();
    
    return (
        // Container for username and logout button
        <div className="flex items-center gap-4 mt-5 mr-4 mb-2 whitespace-nowrap">
            
            {/* Display logged-in user's username */}
            <span className="text-grey-800 font-medium">{username}</span>

            {/* Logout button */}
            {/* Clears auth token and redirects user to login page */}
            <button
                className="font-medium text-red-500 hover:text-red-700"
                type="button"
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Log out
            </button>
        </div>
    );
}

export default TopRightUser;
