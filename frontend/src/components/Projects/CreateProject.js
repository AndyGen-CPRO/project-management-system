import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { getToken } from '../../utils/auth';

import "react-datepicker/dist/react-datepicker.css";

const CreateProject = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        console.log("Token:", token);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/projects/create", {
                name,
                startDate,
                endDate,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            setMessage("Project created successfully.")
        } catch (error) {
            setMessage("Project creation failed.")
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        placeholder="C# Final Project"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy/MM/dd"
                        required
                    />
                </div>
                <div>
                    <label>Description: <i>Optional, but recommended</i></label>
                    <input
                        type="text"
                        placeholder="C# Final Project"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateProject;