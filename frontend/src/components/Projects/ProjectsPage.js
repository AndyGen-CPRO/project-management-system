import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeRole } from '../../utils/auth';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("yourProjects"); // State for tabs
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (token) { //fetches all the project if theres token
            fetchProjects();
            fetchJoinedProjects();
            removeRole(); //removes role when the user leaves a project overview
        } else {    //redirects user to log in page if theres not token
            navigate("/login");
            alert("This page needs authorization to be accessed.")
        }
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data);
            setMessage("Fetching user's projects successful.");
        } catch (error) {
            setMessage("Error fetching projects.");
        }
    };

    const fetchJoinedProjects = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/projects/joined-projects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setJoinedProjects(response.data);
            console.log("Fetching user's joined projects successful.");
        } catch (error) {
            console.log("Error fetching joined projects.");
        }
    };

    const createProject = () => {
        navigate("/create-project");
    };

    const goToInbox = () => {
        navigate("/inbox");
    };

    if(!token) {
        return ( //prevents the projects page from completely loading if theres no token at all
            <p>Projects Loading...</p>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Projects</h1>

            {message && (
                <p className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
                    {message}
                </p>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={createProject}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Create Project
                </button>
                <button
                    onClick={goToInbox}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Inbox
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
                <button
                    onClick={() => setActiveTab("yourProjects")}
                    className={`px-4 py-2 font-medium ${
                        activeTab === "yourProjects"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                    Your Projects
                </button>
                <button
                    onClick={() => setActiveTab("joinedProjects")}
                    className={`px-4 py-2 font-medium ${
                        activeTab === "joinedProjects"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                    Joined Projects
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "yourProjects" && (
                <div>
                    {projects.length > 0 ? (
                        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Created At
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-100 transition"
                                    >
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/project/${project._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">{project.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">
                            You have 0 projects. Click the "Create Project" button to
                            start.
                        </p>
                    )}
                </div>
            )}

            {activeTab === "joinedProjects" && (
                <div>
                    {joinedProjects.length > 0 ? (
                        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Created At
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {joinedProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-100 transition"
                                    >
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/project/${project._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">{project.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">You have 0 joined projects.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Projects;
