import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const Home = () => {
  const token = getToken();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Project Management System
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign up or log in to continue:
        </p>
        <div className="space-y-4">
          {!token ? (
            <>
            <Link to="/register">
            <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
            </Link>
            <Link to="/login">
              <button className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">
                Log In
              </button>
            </Link>
          </>
        ) : (
          <Link to="/projects">
            <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
              Continue to Projects
            </button>
          </Link>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
