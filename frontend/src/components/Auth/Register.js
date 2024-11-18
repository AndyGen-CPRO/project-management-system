import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../utils/auth';

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/register", { displayName, email, password });
            const { token } = response.data;
            setToken(token);
            setMessage("Register successful.");
        } catch (error) {
            setMessage("Registration Failed. Please try again.")
        }
    };
    
    return (
        <div>
            <h2 class="font-extrabold md:block">Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Display Name:</label>
                    <input 
                        type="text" 
                        placeholder="Tatsuki Fujimoto" 
                        value={displayName} 
                        onChange={(e) => setDisplayName(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email"    
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        placeholder="*****" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;