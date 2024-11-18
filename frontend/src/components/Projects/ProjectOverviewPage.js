import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import ProjectDetails from './ProjectDetailsModal';

const ProjectOverview = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [detailsModal, setDetailsModal] = useState(false);
    const token = getToken();

    const fetchProject = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProject(response.data);
            setMessage("Fetching project successful.")
        } catch (error) {
            setMessage("Error fetching project.")
        }
    };
    
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        fetchProject();
    }, [id]);

    const partsPage = () => {
        navigate("/parts")
    }

    const tasksPage = () => {
        navigate("/tasks")
    }

    if (!project) {
        return (
            <div>
                <p>Project Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h1>{project.name} Overview</h1>
            <button onClick={() => {setDetailsModal(true)}}>Project Details</button>
            {detailsModal &&
                <ProjectDetails 
                    closeModal={() => {setDetailsModal(false)}} 
                    project={project} 
                    fetchProject={fetchProject} 
                    token={token}
                />}
        </div>
    )
}

export default ProjectOverview;