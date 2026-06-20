// Importing hooks, components, utilities, and axios
import { useState } from "react";
import LogoHeader from "../components/LogoHeader.jsx";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
    validateEmail,
    validateUsername,
    validateStrongPassword
} from "../utils/validators.js";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints.js";

function Signup() {
    // React Router hook for redirecting the user
    const navigate = useNavigate();

    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Form field error messages
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Message returned from backend (success or error)
    const [serverMessage, setServerMessage] = useState("");

    // Loading state for disabling button + showing spinner text
    const [loading, setLoading] = useState(false);

    // Validates email and password fields
    const validateForm = () => {
        const newErrors = { name: "", email: "", password: "" };

        newErrors.name = validateUsername(formData.name);
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validateStrongPassword(formData.password);

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4 sm:px-0"
            data-testid="signup-page"
        >
            {/* Reusable header logo */}
            <LogoHeader />

            <div
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                data-testid="signup-card"
            >
                <h2
                    className="text-3xl font-bold mb-6 text-center"
                    data-testid="signup-heading"
                >
                    Create Account
                </h2>

                {/* Form Starts */}
                <form
                    data-testid="signup-form"
                    onSubmit={async (e) => {
                        // prevents the browser to refresh
                        e.preventDefault();

                        // Client-side validation check
                        const isValid = validateForm();
                        if (!isValid) {
                            return;
                        }

                        // Prepare UI before sending API request
                        setLoading(true);
                        setServerMessage("");

                        try {
                            // Sending Signup POST request
                            const response = await axios.post(
                                API_BASE_URL + ENDPOINTS.SIGNUP,
                                formData
                            );

                            // backend return message
                            setServerMessage(
                                response.data.message || "Signup Successful"
                            );

                            // Small delay for smooth UX
                            await new Promise(res => setTimeout(res, 1000));

                            // Redirect user to login
                            navigate("/login");
                        } catch (error) {
                            // Display backend error or fallback error
                            setServerMessage(
                                error.response?.data?.error || "Something went wrong"
                            );
                        } finally {
                            // Always stop loading spinner
                            setLoading(false);
                        }
                    }}
                >
                    {/* Username */}
                    <label
                        className="block mb-2 font-semibold"
                        htmlFor="signup-username"
                        data-testid="signup-username-label"
                    >
                        Username
                    </label>
                    <input
                        id="signup-username"
                        data-testid="signup-username-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        autoComplete="name"
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter Username"
                    />
                    {errors.name && (
                        <p
                            className="text-red-500 text-sm mb-2"
                            data-testid="signup-username-error"
                        >
                            {errors.name}
                        </p>
                    )}

                    {/* Email */}
                    <label
                        className="block mb-2 font-semibold"
                        htmlFor="signup-email"
                        data-testid="signup-email-label"
                    >
                        Email
                    </label>
                    <input
                        id="signup-email"
                        data-testid="signup-email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        autoComplete="email"
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter Email"
                    />
                    {errors.email && (
                        <p
                            className="text-red-500 text-sm mb-2"
                            data-testid="signup-email-error"
                        >
                            {errors.email}
                        </p>
                    )}

                    {/* Password */}
                    <label
                        className="block mb-2 font-semibold"
                        htmlFor="signup-password"
                        data-testid="signup-password-label"
                    >
                        Password
                    </label>
                    <input
                        id="signup-password"
                        data-testid="signup-password-input"
                        type="password"
                        name="password"
                        value={formData.password}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter Password"
                    />
                    {errors.password && (
                        <p
                            className="text-red-500 text-sm mb-2"
                            data-testid="signup-password-error"
                        >
                            {errors.password}
                        </p>
                    )}

                    {/* Displays the server response on UI */}
                    {serverMessage && (
                        <p
                            data-testid="signup-server-message"
                            className={`text-center text-sm mt-2 ${
                                serverMessage.includes("Success")
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}
                        >
                            {serverMessage}
                        </p>
                    )}

                    {/* Login redirect link */}
                    <div
                        className="flex justify-between"
                        data-testid="signup-login-section"
                    >
                        <p
                            className="text-sm text-center"
                            data-testid="signup-login-text"
                        >
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-blue-600 text-sm hover:underline cursor-pointer p-1"
                                data-testid="signup-login-link"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>

                    {/* Submit Button, button shows loading state while API is running */}
                    <button
                        data-testid="signup-submit-button"
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;