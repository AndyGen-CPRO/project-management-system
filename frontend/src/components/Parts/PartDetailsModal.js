import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartDetails = ({ closeModal, part, token }) => {
    const [partTasks, setPartTasks] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${part._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPartTasks(response.data);
                setMessage("Fetching project tasks successful.")
            } catch (error) {
                setMessage("Error fetching tasks.")
            }
        };
    })
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/parts/${part._id}`, {
                name,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            closeModal(false);
            setMessage("Project update successful.")
        } catch (error) {
            setMessage("Project update failed.")
        }
    };

    //part detail + parts under it
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {part._id}
            </div>
        </div>
    )
};

export default PartDetails;