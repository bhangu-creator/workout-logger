// Importing hooks, components, utilities, and axios
import { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import LogoHeader from "../components/LogoHeader.jsx";
import { validateEmail, validatePassword } from "../utils/validators.js";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints.js";

function Login() {
    // React Router hook for redirecting the user
    const navigate = useNavigate();

    // Form data state
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Form field error messages
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    // Message returned from backend (success or error)
    const [serverMessage, setServerMessage] = useState("");

    // Loading state for disabling button + showing spinner text
    const [loading, setLoading] = useState(false);

    // Validates email and password fields
    const validateFormDate = () => {
        const newErrors = { email: "", password: "" };

        newErrors.email = validateEmail(formData.email);
        newErrors.password = validatePassword(formData.password);

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4"
            data-testid="login-page"
        >
            {/* Reusable header logo */}
            <LogoHeader mode="absolute" />

            <div
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
                data-testid="login-card"
            >
                <h2
                    className="text-2xl sm:text-3xl font-bold mb-6 text-center"
                    data-testid="login-heading"
                >
                    Log In
                </h2>

                {/*Form starts*/}
                <form
                    data-testid="login-form"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        // Client-side validation check
                        const isValid = validateFormDate();
                        if (!isValid) {
                            return;
                        }

                        // Prepare UI before sending API request
                        setLoading(true);
                        setServerMessage("");

                        try {
                            // Sending login POST request
                            const response = await axios.post(
                                API_BASE_URL + ENDPOINTS.LOGIN,
                                formData
                            );

                            setServerMessage(response.data.message || "Login Successfull");

                            // Store JWT token in browser storage
                            localStorage.setItem("token", response.data.token);

                            // Small delay for smooth UX
                            await new Promise(res => setTimeout(res, 1000));

                            // Redirect user to dashboard
                            navigate("/workouts");
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
                    {/*Email field */}
                    <label
                        className="block mb-2 font-semibold text-sm sm:text-base"
                        htmlFor="login-email"
                        data-testid="login-email-label"
                    >
                        Enter Email
                    </label>

                    <input
                        id="login-email"
                        data-testid="login-email-input"
                        type="email"
                        value={formData.email}
                        name="email"
                        autoComplete="email"
                        className="w-full p-2 border rounded mb-4 text-sm sm:text-base"
                        placeholder="Enter Email"
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, email: e.target.value }))
                        }
                    />

                    {errors.email && (
                        <p
                            className="text-red-500 text-xs sm:text-sm mb-2"
                            data-testid="login-email-error"
                        >
                            {errors.email}
                        </p>
                    )}

                    {/*Password field*/}
                    <label
                        className="block mb-2 font-semibold text-sm sm:text-base"
                        htmlFor="login-password"
                        data-testid="login-password-label"
                    >
                        Enter Password
                    </label>

                    <input
                        id="login-password"
                        data-testid="login-password-input"
                        type="password"
                        value={formData.password}
                        name="password"
                        autoComplete="password"
                        placeholder="Enter Password"
                        className="w-full p-2 border rounded mb-4 text-sm sm:text-base"
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, password: e.target.value }))
                        }
                    />

                    {errors.password && (
                        <p
                            className="text-red-500 text-xs sm:text-sm mb-2"
                            data-testid="login-password-error"
                        >
                            {errors.password}
                        </p>
                    )}

                    <div
                        className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0"
                        data-testid="login-links-section"
                    >
                        {/* forgot password link*/}
                        <Link
                            to="/forgotpassword"
                            className="text-blue-600 text-xs sm:text-sm hover:underline cursor-pointer"
                            data-testid="login-forgot-password-link"
                        >
                            Forgot password
                        </Link>

                        {/* Signup redirect link*/}
                        <p
                            className="text-xs sm:text-sm text-center sm:text-right"
                            data-testid="login-signup-text"
                        >
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="text-blue-600 text-xs sm:text-sm hover:underline cursor-pointer p-1"
                                data-testid="login-signup-link"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/*Submit Button*/}
                    {!serverMessage.toLowerCase().includes("success") && (
                        <p
                            className="text-center text-xs sm:text-sm mt-2 text-red-500"
                            data-testid="login-server-message"
                        >
                            {serverMessage}
                        </p>
                    )}

                    <button
                        data-testid="login-submit-button"
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 disabled:opacity-50 text-sm sm:text-base"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;