import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreatePart = ({ closeModal, fetchParts, project, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    //const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/project/${project._id}/parts/create`, {
                name,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchParts();
            setMessage("Part created successfully.")
        } catch (error) {
            setMessage("Part creation failed.")
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Parts</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" >Part Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description: <i>"Optional, but recommended</i></label>
                        <input
                            type="text"
                            placeholder="C# Final Project"
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-row space-y-2 mb-2 px-2 pt-3">
                        <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300" type="submit">Create</button>
                        <button onClick={() => closeModal(false)}className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePart;