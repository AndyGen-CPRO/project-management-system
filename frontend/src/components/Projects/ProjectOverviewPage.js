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
            return;
        }
        fetchProject();
        fetchMemberRole();
    }, [id]);

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{project.name} Overview</h1>
                <button onClick={() => {setDetailsModal(true)}} class="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Project Details</button>
                <button onClick={() => {setMembersModal(true)}} class="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Project Members</button>
                <button onClick={partsPage} class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Parts</button>
                <button onClick={tasksPage} class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Tasks</button>
                <div>
                <button onClick={goBack} className="px-3 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Back </button>
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
        </div>
    )
}

export default ProjectOverview;