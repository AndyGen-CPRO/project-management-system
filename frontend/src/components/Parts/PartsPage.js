import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import CreatePart from './CreatePartModal';
import PartDetails from './PartDetailsModal';

const Parts = () => {
    const { state } = useLocation();
    const project = state?.project;
    const role = state?.role;
    const [parts, setParts] = useState([]);
    const [message, setMessage] = useState("");
    const [createPartModal, setCreatePartModal] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            alert("This page needs authorization to be accessed.")
            return;
        }
        if (project._id) {
            fetchParts();
        }
    }, []);

    const fetchParts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/project/${project._id}/parts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setParts(response.data);
            console.log("Fetching project parts successful.")
        } catch (error) {
            setMessage("Error fetching parts.")
        }
    };
    const goBack = () => {
        navigate(-1)
    }
    
    
    if(!token || !project) {
        return(
            <p>Project Parts Loading...</p>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{project.name} Parts</h2>
            {message && <p>{message}</p>}

            {role === "Owner" && <button 
            onClick={() => setCreatePartModal(true)} 
            class="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow
             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create Part</button>}

            {createPartModal && 
                <CreatePart 
                    closeModal = {() => {setCreatePartModal(false)}}
                    fetchParts={fetchParts}
                    project = {project}
                    token = {token}
                />
            }

            {parts.length > 0 ? (
                <table className="w-full table-auto border-collapse shadow-lg rounded-lg">
                    <tbody>
                        {parts.map((part) => (
                            <tr key={part.id}>
                                <td>
                                    <strong className="text-1x1 font-bold text-gray-800 mb-6 text-center">{part.name}</strong>
                                    {part.description ? (
                                        <div>
                                            <ul>
                                                <label className="block text-gray-700 font-medium mb-1">Description: </label>
                                                <li className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">{part.description}  </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"> No description.</p>
                                    )}      
                                </td>   
                                <td>
                                    <button onClick={() => setSelectedPart(part)}class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >Details</button>   
                                </td>                     
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Project has no parts. Click the Create button to create one.</p>
            )}

            {selectedPart && (
                <PartDetails 
                    closeModal={() => setSelectedPart(null)}
                    fetchParts={fetchParts}
                    project={project}
                    part={selectedPart}
                    token={token}
                    role={role}
                />
            )}
            <button onClick={goBack}className="px-3 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Back</button>
            </div>
        </div>
    )
}

export default Parts;