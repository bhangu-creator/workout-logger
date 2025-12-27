import LogoHeader from "../components/LogoHeader.jsx";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validateStrongPassword, confirmPassword } from "../utils/validators";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints.js";

// ResetPassword allows the user to reset their password using a token from the URL
function ResetPassword() {

    // Extract reset token from URL params
    const { token } = useParams();

    // Hook used to navigate programmatically after successful reset
    const navigate = useNavigate();

    // Form state for new password and confirmation
    const [formData, setFormData] = useState({
        passwordInput1: "",
        newPassword: ""
    });
    
    // State to store validation errors for each field
    const [errors, setErrors] = useState({
        passwordInput1: "",
        newPassword: ""
    });

    // State to display server response messages
    const [serverMessage, setServerMessage] = useState("");
    
    // Loading state to disable submit button during API request
    const [loading, setLoading] = useState(false);

    // Validates password inputs before submitting
    function validateForm() {
        const newErrors = { passwordInput1: "", newPassword: "" };

        // Validate password strength
        newErrors.passwordInput1 = validateStrongPassword(formData.passwordInput1);

        // Validate password confirmation
        newErrors.newPassword = confirmPassword(
            formData.passwordInput1,
            formData.newPassword
        );

        setErrors(newErrors);

        // Form is valid only if all error messages are empty
        return Object.values(newErrors).every(error => error == "");
    }

    return (
        // Page container with centered reset form
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            
            {/* Reusable logo header */}
            <LogoHeader />

            {/* Reset password card */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                
                {/* Page heading */}
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Reset Password
                </h2>

                {/* Reset password form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        // Validate form before making API request
                        const valid = validateForm();
                        if (!valid) return;

                        try {
                            setServerMessage("");
                            setLoading(true);

                            // Send reset password request to backend using token
                            const response = await axios.post(
                                API_BASE_URL + ENDPOINTS.RESETPASSWORD + token,
                                formData
                            );

                            // Optional delay for better UX feedback
                            await new Promise(res => setTimeout(res, 1000));

                            // Display success message from server or fallback
                            setServerMessage(
                                response.data.message ||
                                "Password Reset Successfull"
                            );

                            // Redirect user to login page after successful reset
                            setTimeout(() => navigate("/login"), 1500);
                        } catch (error) {
                            // Display error message from server or fallback
                            setServerMessage(
                                error.response?.data?.error ||
                                "Something went wrong"
                            );
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {/* New password input */}
                    <label className="block mb-2 font-semibold">
                        Enter New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.password}
                        placeholder="Enter Password"
                        className="w-full p-2 border rounded mb-4"
                        autoComplete="new-password"
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                passwordInput1: e.target.value
                            }));
                        }}
                    />

                    {/* Password strength validation error */}
                    {errors.passwordInput1 && (
                        <p className="text-sm text-center text-red-500 mb:2">
                            {errors.passwordInput1}
                        </p>
                    )}

                    {/* Confirm password input */}
                    <label className="block mb-2 mt-2 font-semibold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.password}
                        placeholder="Enter Password Again"
                        className="w-full p-2 border rounded mb-4"
                        autoComplete="new-password"
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                newPassword: e.target.value
                            }));
                        }}
                    />

                    {/* Password confirmation validation error */}
                    {errors.newPassword && (
                        <p className="text-sm text-center text-red-500 mb:2">
                            {errors.newPassword}
                        </p>
                    )}

                    {/* Server response message */}
                    {serverMessage && (
                        <p
                            className={`text-center text-sm ${
                                serverMessage.includes("successfull")
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {serverMessage}
                        </p>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-40 block mx-auto text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50 bg-blue-500"
                        disabled={loading}
                    >
                        {loading ? "Reseting Password..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
