import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskAssignment = ({closeModal, project, task, token }) => {
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
            if (!token) {
                navigate("/login");
                return;
            }

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
            setMessage("Task created successfully.")
        } catch (error) {
            setMessage("Task creation failed.")
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Select Members</h3>
                    <div>
                        <label>Project Members: </label>
                        {projMembers.length > 0 ? (
                            projMembers.map((member) => (
                                <div key={member._id}>
                                    <label>{member.userId.displayName}</label>
                                    <button onClick={() => handleSubmit(member.userId._id)}>Add</button>
                                </div>
                            ))
                        ) : (
                            <p>No members found.</p>
                        )}
                    </div>
                    <button onClick={() => closeModal(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default TaskAssignment;