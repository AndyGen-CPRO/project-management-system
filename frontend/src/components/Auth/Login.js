import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../utils/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", { email, password });
            
            if (response.status === 204) {
                setMessage("Login attempt failed: No content returned");
            } else if (response.data?.token) {
                const { token } = response.data;
                setToken(token);
                setMessage("Log in successful.");
                navigate("/projects");
            } else {
                setMessage("Unknown response from the server.");
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setMessage("Bad request: " + data.message);
                        break;
                    case 401:
                        setMessage("Unauthorized: " + data.message);
                        break;
                    case 404:
                        setMessage("Not found: " + data.message);
                        break;
                    case 500:
                        setMessage("Server error: " + data.message);
                        break;
                    default:
                        setMessage("An unknown error occurred.");
                        break;
                }
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email:</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                {/* Message Display */}
                {message && (
                    <p className="mt-4 text-sm font-medium text-red-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
