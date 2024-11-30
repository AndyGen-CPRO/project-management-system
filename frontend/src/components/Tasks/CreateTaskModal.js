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
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/project/${project._id}/tasks/create`, {
                partId,
                name,
                description,
                dueDate,
                priority
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
                <h2>Create Task</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Part</label>
                        {parts.length > 0 ? (
                            <select onChange={(e) => setPartId(e.target.value)}>
                                <option value="" disabled selected>Select a Part</option>
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
                        <textarea
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
                            <option value="" disabled selected>...</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={() => closeModal(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
};

export default CreateTask;