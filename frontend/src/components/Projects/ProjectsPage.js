import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = getToken();
                if (!token) {
                    navigate("/login");
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

        fetchProjects();
    }, []);

    const createProject = () => {
        navigate("/create-project")
    };

    return (
        <div>
            <h1>Projects</h1>
            {message && <p>{message}</p>}
            <button onClick={createProject}>Create</button>
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
        </div>
    )
}

export default Projects;