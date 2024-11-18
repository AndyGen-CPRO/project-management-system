import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const Parts = () => {
    const { projectId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        console.log("Token:", token);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/parts/${projectId}/create`, {
                name,
                description,
                percentage
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
        <div>
            <h1>Create Parts </h1>
        </div>
    )
}