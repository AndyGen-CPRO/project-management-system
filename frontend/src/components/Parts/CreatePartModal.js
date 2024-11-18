import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreatePart = ({ closeModal, project, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    //const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/parts/${project._id}/create`, {
                name,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            setMessage("Part created successfully.")
        } catch (error) {
            setMessage("Part creation failed.")
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create Parts</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Part Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description: <i>"Optional, but recommended</i></label>
                        <input
                            type="text"
                            placeholder="C# Final Project"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit">Create</button>
                    <button onClick={() => closeModal(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePart;