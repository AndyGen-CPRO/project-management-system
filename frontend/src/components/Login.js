import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });
            setMessage(response.data.message);
            navigate('/ProjectOverview')
            setMessage("Login is success")
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
                <button type="submit">Log in</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;