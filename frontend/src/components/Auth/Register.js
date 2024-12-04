import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, getToken } from '../../utils/auth';

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const userToken = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(userToken){
            navigate("/projects");
            alert("You are currently logged in.")
            return;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/register", { displayName, email, password });
            alert("Register successful.");
            navigate("/login")
        } catch (error) { // more precises error handing because it feels like this shit breaks every fresh install
            if (error.response) {
                const {status,data} = error.response
                switch (status){
                    case 400:
                        setMessage('Bad request Incorrect information' + data.message);
                        break;
                    case 401:
                        setMessage('Email already in use or unauthrized please log in' + data.message)
                        break;
                    case 404:
                        setMessage('Not found' + data.message)
                        break;
                    case 500:
                        setMessage('Server error: Server unavailable' + data.message)
                        break;
                    default:
                        setMessage("Unknow Error has occured");
                        break;
                }
            }
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Display Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Display Name:</label>
                    <input
                        type="text"
                        placeholder="Tatsuki Fujimoto"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password:</label>
                    <input
                        type="password"
                        placeholder="*****"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Register
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

export default Register;