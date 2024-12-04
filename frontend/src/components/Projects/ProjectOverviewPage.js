import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken, setRole, getRole } from '../../utils/auth';
import ProjectDetails from './ProjectDetailsModal';
import ProjectMembers from './ProjectMembersModal';

const ProjectOverview = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [projMembers, setProjMembers] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [detailsModal, setDetailsModal] = useState(false);
    const [membersModal, setMembersModal] = useState(false);
    const token = getToken();
    const role = getRole();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            alert("This page needs authorization to be accessed.")
            return;
        }
        fetchProject();
    }, [id]);
    
    useEffect(() => {
        if (project) {
            fetchMemberRole();
        }
    }, [project]);

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

    const fetchMemberRole = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/project/${project._id}/member-role`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRole(response.data);
            setMessage("Fetching project members successful.")
        } catch (error) {
            setMessage("Error fetching members.")
        }
    };

    const goBack = () => {
        navigate("/projects");
    }

    const partsPage = () => {
        navigate("/project/:id/parts", {
            state: { project, role }
        })
    };

    const tasksPage = () => {
        navigate("/project/:id/tasks", {
            state: { project, role }
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{project.name} Overview</h1>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => {setDetailsModal(true)}} 
                    className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md 
                    hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        Project Details</button>
                        
                    <button onClick={() => {setMembersModal(true)}} 
                    className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md 
                    hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        Project Members</button>

                    <button onClick={partsPage} 
                    className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md 
                    hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        Parts</button>

                    <button onClick={tasksPage} 
                    className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md 
                    hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        Tasks</button>
                </div>
                <div>
                <button onClick={goBack} className="px-3 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Back </button>
                </div>
                {detailsModal &&
                    <ProjectDetails 
                        closeModal={() => {setDetailsModal(false)}} 
                        project={project} 
                        fetchProject={fetchProject} 
                        token={token}
                        role={role}
                    />}
                {membersModal &&
                    <ProjectMembers 
                        closeModal={() => {setMembersModal(false)}}
                        project={project}
                        token={token}
                        role={role}
                    />}
                </div>
        </div>
    )
}

export default ProjectOverview;