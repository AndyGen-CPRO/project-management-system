import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeRole, getToken } from "../../utils/auth";

const Navbar = () => {
    const token = getToken();
    const navigate = useNavigate();
    const logOut = () => {
        removeToken();
        removeRole();
        navigate('')
    }
    const home = () => {
      navigate('');
    }

 return (
  <header className="bg-blue-600 shadow-md">
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="text-white text-lg font-bold">
        <button className="hover:text-blue-300 transition" onClick={home}>Home</button>
      </div>
      {token && (
        <div className="text-white text-lg font-bold">
        <button className="hover:text-blue-300 transition" onClick={logOut}>Log Out</button>
      </div>
      )}
    </nav>
  </header>
 );
};

export default Navbar;