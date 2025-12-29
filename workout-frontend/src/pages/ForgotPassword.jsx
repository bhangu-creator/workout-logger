import { useState } from "react";
import { validateEmail } from "../utils/validators";
import LogoHeader from "../components/LogoHeader";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints.js";

// ForgotPassword allows the user to request a password reset link
// by submitting their registered email address
function ForgotPassword() {

    // Form state for email input
    const [formData, setFormData] = useState({ email: "" });

    // State to store validation errors
    const [errors, setErrors] = useState({ email: "" });

    // State to display server response messages
    const [serverMessage, setServerMessage] = useState("");

    // Loading state to disable submit button while request is in progress
    const [loading, setLoading] = useState(false);

    // Validates form data before submitting
    function validateFormData() {
        const newErrors = { email: "" };

        // Validate email format
        newErrors.email = validateEmail(formData.email);

        setErrors(newErrors);

        // Form is valid only if all error messages are empty
        return Object.values(newErrors).every(error => error == "");
    }

    return (
        // Page container with centered form
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            
            {/* Reusable logo header */}
            <LogoHeader />

            {/* Forgot password card */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                
                {/* Page heading */}
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Enter registered email
                </h2>

                {/* Forgot password form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        // Validate input before making API request
                        const valid = validateFormData();
                        if (!valid) return;

                        try {
                            setServerMessage("");
                            setLoading(true);

                            // Send forgot password request to backend
                            const response = await axios.post(
                                API_BASE_URL + ENDPOINTS.FORGOTPASSWORD,
                                formData
                            );

                            // Optional delay for better UX feedback
                            await new Promise(res => setTimeout(res, 1000));

                            // Show success message from server or fallback message
                            setServerMessage(
                                response.data.message ||
                                "if that email exists, a reset link has been sent!"
                            );
                        } catch (error) {
                            // Show error message from server or fallback message
                            setServerMessage(
                                error.response?.data?.error ||
                                "Something went Wrong"
                            );
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {/* Email input field */}
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Enter email"
                        autoComplete="email"
                        className="w-full p-2 border rounded mb-4"
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                email: e.target.value
                            }));
                        }}
                    />

                    {/* Email validation error */}
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-2 text-center">
                            {errors.email}
                        </p>
                    )}

                    {/* Informational message */}
                    <p className="text-gray-600 text-center text-sm mb-4">
                        A reset link will be sent to your registered email
                    </p>

                    {/* Server response message */}
                    {serverMessage && (

                        <p className={`text-sm text-center mt-2 ${serverMessage.toLowerCase().includes("timeout")?"text-red-500":"text-green-600"}`}>{serverMessage}</p>
                    )}

                    {/* Submit button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-40 block mx-auto bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50"
                    >
                        {loading ? "Sending Reset Link..." : "Send Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
