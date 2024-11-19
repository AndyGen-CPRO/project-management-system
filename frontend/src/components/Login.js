// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// ORIGINAL VERSION
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'


// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/login", { email, password });
//             setMessage(response.data.message);
//             navigate('/ProjectOverview')
//             setMessage("Login is success")
//         } catch (error) {
//             setMessage("Log in Failed. Please try again.")
//         }
//     };
    
//     return (
//         <div>
//             <h2>User Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="email" 
//                     placeholder="Email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required
//                 />
//                 <button type="submit">Log in</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// };

// export default Login;


// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// VERSION 2
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      setMessage("Login successful");
      navigate('/ProjectOverview');
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 style={{ textAlign: 'center' }}>User Login</h2>
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
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default Login;
