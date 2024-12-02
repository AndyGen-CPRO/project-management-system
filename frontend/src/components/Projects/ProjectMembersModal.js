import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectMembers = ({ closeModal, project, token }) => {
    const [projMembers, setProjMembers] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useState(() => {
        if(project) {
            fetchMembers();
        }
    })
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

    const handleInvite = async () => {
        try {
            const responsee = await axios.post(`http://localhost:5000/projects/`)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">

            </div>
        </div>
    )
}