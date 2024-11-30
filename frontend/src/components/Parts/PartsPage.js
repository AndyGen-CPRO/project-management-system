import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import CreatePart from './CreatePartModal';
import PartDetails from './PartDetailsModal';

const Parts = () => {
    const { state } = useLocation();
    const project = state?.project;
    const [parts, setParts] = useState([]);
    const [message, setMessage] = useState("");
    const [createPartModal, setCreatePartModal] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (project._id) {
            fetchParts();
        }
    }, []);

    const fetchParts = async () => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(`http://localhost:5000/project/${project._id}/parts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setParts(response.data);
            setMessage("Fetching project parts successful.")
        } catch (error) {
            setMessage("Error fetching parts.")
        }
    };


    return (
        <div>
            <h2>{project.name} Parts</h2>
            {message && <p>{message}</p>}
            <button onClick={() => setCreatePartModal(true)}>Create Part</button>
            {createPartModal && 
                <CreatePart 
                    closeModal = {() => {setCreatePartModal(false)}}
                    fetchParts={fetchParts}
                    project = {project}
                    token = {token}
                />
            }

            {parts.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Part</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part) => (
                            <tr key={part.id}>
                                <td>
                                    <strong>{part.name}</strong>
                                    {part.description && (
                                        <div>
                                            <ul>
                                                <li>{part.description}</li>
                                            </ul>
                                        </div>
                                    )}      
                                </td>   
                                <td>
                                    <button onClick={() => setSelectedPart(part)}>Details</button>   
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
                />
            )}
        </div>
    )
}

export default Parts;