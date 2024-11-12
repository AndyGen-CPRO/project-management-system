import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Log in Failed. Please try again.")
        }
    };
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit"  className="bg-blue-500 text-white p-2 rounded">Log in</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;