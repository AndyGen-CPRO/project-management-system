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
            
            if (response.status === 204) { // when the server responds with a 204 the frontend does nothing and it often threw me off. now it atleast tell you something went wrong or atlest that was the idea
                setMessage("login atempt null no content found") // apparently axios get's stuck after returning a 204. https://github.com/axios/axios/issues/6327 more information here I think
            } else if (response.data?.token){
            const { token } = response.data;
            setToken(token);
            setMessage("Log in successful.");
            navigate("/projects")}
            else { //just for the unexpected 
                setMessage("Unknown responce from server")
            }
        } catch (error) { // more precise error handling because I made it for the Register and not point leaving login out
            if (error.response) {
                const {status,data} = error.response
                switch (status){
                    case 400:
                        setMessage('Bad request Incorrect information' +data.message);
                        break;

                    case 401:
                        setMessage('unauthroized please log in' + data.message)
                        break;
                    case 404:
                        setMessage('Not found' + data.message)
                        break;
                    case 500:
                        setMessage('Server error: Server unavailable' +data.message)
                        break;
                    default:
                        setMessage("Unknown Error has occured");
                        break;

                }
            }
        }
    };
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
            <p>{message}</p>
            
        </div>
        
    );
};

export default Login;