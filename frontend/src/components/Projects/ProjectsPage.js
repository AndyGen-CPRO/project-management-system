import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';


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
        }
    }, []);

    const fetchProjects = async () => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }

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
            if (!token) {
                navigate("/login");
                return;
            }
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
        navigate("/InboxPage")
    }

    return (
        <div>
            <h1>Projects</h1>
            {message && <p>{message}</p>}
            <button onClick={createProject}>Create</button>
            <button onClick={goToInbox}>Inbox</button>
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
                                <td>
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
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedProjects.map((project) => (
                            <tr key={project.id}>
                                <td>
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