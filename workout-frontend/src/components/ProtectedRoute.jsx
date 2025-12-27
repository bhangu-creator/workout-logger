import { Navigate } from "react-router-dom";

// ProtectedRoute is a wrapper component used to guard private routes
// It checks whether an authentication token exists before rendering the child components
function ProtectedRoute({ children }) {

    // Retrieve auth token from localStorage
    // Presence of token is treated as a logged-in state
    const token = localStorage.getItem("token");

    // If no token is found, redirect user to the login page
    // `replace` prevents the user from navigating back to the protected route
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the protected content
    return children;
}

export default ProtectedRoute;
