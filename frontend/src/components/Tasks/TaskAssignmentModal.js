import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskAssignment = ({closeModal, fetchTaskMembers, taskMembers, project, task, token }) => {
    const [projMembers, setProjMembers] = useState([]);
    const [assignedMember, setAssignedMember] = useState("");
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (project._id) {
            fetchMembers();
        }
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/project/${project._id}/members`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProjMembers(response.data);
            setMessage("Fetching project members successful.")
        } catch (error) {
            setMessage("Error fetching members.")
        }
    };

    const handleSubmit = async(userId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/project/${project._id}/task/${task._id}/assign`
                , {
                userId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchTaskMembers();
            setMessage("Task created successfully.")
        } catch (error) {
            setMessage("Task creation failed.")
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Members</h3>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Project Members:
                    </label>
                    {projMembers.length > 0 ? (
                        projMembers.map((member) => {
                            const isAssigned = taskMembers.some(
                                (taskMember) => taskMember.userId._id === member.userId._id
                            );
    
                            return (
                                <div key={member._id} className="flex items-center mb-2">
                                    <label className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {member.userId.displayName}
                                    </label>
    
                                    <button
                                        onClick={() => handleSubmit(member.userId._id)}
                                        disabled={isAssigned} // Disable if already assigned
                                        className={`px-3 py-1 ml-2 text-sm font-medium rounded shadow focus:outline-none focus:ring-2 ${
                                            isAssigned
                                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                                        }`}
                                    >
                                        {isAssigned ? 'Assigned' : 'Add'}
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p>No members found.</p>
                    )}
                </div>
                <button
                    onClick={() => closeModal(false)}
                    className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
    
}

export default TaskAssignment;