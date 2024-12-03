import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeRole } from '../../utils/auth';


const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (token) {
        fetchProjects();
        fetchJoinedProjects();
        removeRole();
        } else {
            navigate("/login");
            return;
        }
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setProjects(response.data)
            setMessage("Fetching user's projects successful.");
        } catch (error) {
            setMessage("Error fetching projects.")
        }
    };

    const fetchJoinedProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/joined-projects", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setJoinedProjects(response.data)
            setMessage("Fetching user's joined projects successful.");
        } catch (error) {
            setMessage("Error fetching joined projects.")
        }
    };

    const createProject = () => {
        navigate("/create-project")
    };
    const goToInbox = () => {
        navigate("/inbox")
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Projects</h1>
            {message && <p>{message}</p>}
            <button onClick={createProject} class="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Create</button>
            <button onClick={goToInbox} class="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Inbox</button>
            {projects.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td  className="hover: text underline">
                                    <Link to={`/project/${project._id}`}>{project.name}</Link>
                                </td>
                                <td>
                                    {project.createdAt}
                                </td>
                                <td>
                                    {project.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have 0 projects. Click the create button to create one.</p>
            )}

            {joinedProjects.length > 0 ? (
                <table className=" w-2/8 p-8 bg-white shadow-lg rounded-lg">
                    <thead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedProjects.map((project) => (
                            <tr key={project.id}>
                                <td className="hover:bg-blue-700 underline">
                                    <Link to={`/project/${project._id}`}>{project.name}</Link>
                                </td>
                                <td>
                                    {project.createdAt}
                                </td>
                                <td>
                                    {project.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have 0 joined projects.</p>
            )}
        </div>
    )
}

export default Projects;