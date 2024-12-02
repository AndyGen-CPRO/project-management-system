import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from "../../utils/auth";


const Navbar = () => {
    const navigate = useNavigate();
    const home = () => {
        removeToken()
        navigate('')
    }

 return (
   <header className="header">
     <nav className="nav container">
      <button onClick={home}>Back to Home</button>
     </nav>
   </header>
 );
};

export default Navbar;