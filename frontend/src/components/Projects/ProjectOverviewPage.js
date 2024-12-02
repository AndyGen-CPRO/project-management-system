import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import ProjectDetails from './ProjectDetailsModal';
import ProjectMembers from './ProjectMembersModal';

const ProjectOverview = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [detailsModal, setDetailsModal] = useState(false);
    const [membersModal, setMembersModal] = useState(false);
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

    const goBack = () => {
        navigate("/projects");
    }
    
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchProject();
    }, [id]);

    const partsPage = () => {
        navigate("/project/:id/parts", {
            state: { project }
        })
    };

    const tasksPage = () => {
        navigate("/project/:id/tasks", {
            state: { project }
        })
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
            <button onClick={() => {setMembersModal(true)}}>Project Members</button>
            <button onClick={partsPage}>Parts</button>
            <button onClick={tasksPage}>Tasks</button>
            <div>
            <button onClick={goBack}>Back </button>
            </div>
            {detailsModal &&
                <ProjectDetails 
                    closeModal={() => {setDetailsModal(false)}} 
                    project={project} 
                    fetchProject={fetchProject} 
                    token={token}
                />}
            {membersModal &&
                <ProjectMembers 
                    closeModal={() => {setMembersModal(false)}}
                    project={project}
                    token={token}
                />}
        </div>
    )
}

export default ProjectOverview;