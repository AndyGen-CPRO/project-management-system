import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeRole } from "../../utils/auth";


const Navbar = () => {
    const navigate = useNavigate();
    const home = () => {
        removeToken();
        removeRole();
        navigate('')
    }

 return (
   <header className="bg-blue-600 shadow-md">
     <nav className="container mx-auto flex items-center justify-between py-4 px-6">
     <div className="text-white text-lg font-bold">
      <button className="hover:text-blue-300 transition" onClick={home}>Back to Home</button>
      </div>
     </nav>
   </header>
 );
};

export default Navbar;