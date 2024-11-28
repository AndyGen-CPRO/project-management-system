import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = ({ closeModal, project, parts, token }) => {
    const [partId, setPartId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState("");
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [projMembers, setProjMembers] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/project-members/${project._id}`, {
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
        console.log("Selected Part ID:", partId); // Debugging line

    if (!partId) {
        setMessage("Please select a part.");
        return; // Prevent submission if partId is not set
    }
        try {
            const response = await axios.post(`http://localhost:5000/tasks/${project._id}/create`, {
                partId,
                name,
                description,
                dueDate,
                priority,
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
                <h2>Create Task</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Part</label>
                        {parts.length > 0 ? (
                            <select onChange={(e) => setPartId(e.target.value)}>
                                <option value="" disabled>Select a Part</option>
                                {parts.map((part) => (
                                <option key={part._id} value={part._id}>
                                    {part.name}
                                </option>
                                ))}
                            </select>
                        ) : (
                            <p>No parts found.</p>
                        )}
                    </div>
                    <div>
                        <label>Task Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input
                            type="text"
                            placeholder="C# Final Project"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Due Date: </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            dateFormat="yyyy/MM/dd"
                            required
                        />
                    </div>
                    <div>
                        <label>Priority: </label>
                        <select onChange={(e) => setPriority(e.target.value)}>
                            <option value="" disabled>...</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
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
};

export default CreateTask;