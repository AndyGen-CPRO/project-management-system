import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = ({ closeModal, fetchTasks, project, parts, token }) => {
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
            fetchTasks();
            setMessage("Task created successfully.")
        } catch (error) {
            setMessage("Task creation failed.")
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Task</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Part</label>
                        {parts.length > 0 ? (
                            <select onChange={(e) => setPartId(e.target.value) }class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                
                                <option value="" disabled selected
                                >Select a Part</option>
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
                        <label className="block text-gray-700 font-medium mb-1">Task Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description: </label>
                        <textarea
                            type="text"
                            placeholder="C# Final Project"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="resize-none block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Due Date: </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            dateFormat="yyyy/MM/dd"
                            required
                            className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Priority: </label>
                        <select class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setPriority(e.target.value)}>
                            <option value="" disabled selected>...</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">Submit</button>
                    <button onClick={() => closeModal(false)} className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Cancel</button>
                </form>
            </div>
        </div>
    )
};

export default CreateTask;