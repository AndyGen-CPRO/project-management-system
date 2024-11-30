import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskAssignment = ({closeModal, project, token }) => {
    const [projMembers, setProjMembers] = useState([]);
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        if (project._id) {
            fetchMembers();
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/project/${project._id}/task/$`
                , {
                assignedMembers
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

    const handleMemberSelection = (e) => {
        const { value, checked } = e.target;

        setAssignedMembers((prev) => {
            if (checked) {
                return [...prev, value]; // Add member to selected list
            } else {
                return prev.filter(member => member !== value); // Remove member from selected list
            }
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Select Members</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                            <label>Assigned Members: </label>
                            {projMembers.length > 0 ? (
                                projMembers.map((member) => (
                                    <div key={member._id}>
                                        <input
                                            type="checkbox"
                                            value={member.userId._id}
                                            onChange={handleMemberSelection}
                                        />
                                        <label>{member.userId.displayName}</label>
                                    </div>
                                ))
                            ) : (
                                <p>No members found.</p>
                            )}
                        </div>
                        <button type="submit">Submit</button>
                        <button onClick={() => closeModal(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default TaskAssignment;