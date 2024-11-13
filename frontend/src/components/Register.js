import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", { displayName, email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Registration Failed. Please try again.")
        }
    };
    
    return (
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
            <h2 class="font-extrabold md:block">Register</h2>
            <form onSubmit={handleSubmit}>
                <div>Display Name:</div>
                <input 
                    type="text" 
                    placeholder="Tatsuki Fujimoto" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    required
                />
                <div>Email</div>
                <input 
                    type="email"    
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <div>Password</div>
                <input 
                    type="password" 
                    placeholder="*****" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit"  className="bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;