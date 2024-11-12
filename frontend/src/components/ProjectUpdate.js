import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
import './general.css';

const ProjectUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState({
        name: '',
        lead: '',
        userId: 'test',
        description: '',
        type: ''
    });
    const [usernames, setUsernames] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch project data by ID
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/project/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching Project', error);
                setMessage(`Updating project ${project.name}`);
            }
        };
        fetchProject();
    }, [id]);

    // Fetch usernames for the dropdown
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Usernames');
                setUsernames(response.data);
            } catch (error) {
                console.error('Error fetching Project', error);
                setMessage('There was a problem loading Users');
            }
        };
        fetchUsername();
    }, []);
    //changes the userId and display name whenever 
    const setAsLead = (id, displayName) => {
        setProject(prevProject => ({
            ...prevProject,
            userId: id,
            lead: displayName
        }));
        console.log(`New lead: ${displayName}`);
    };
    //changes the project whenever an input is changed 
    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    //functionality of the back button that returns the user to the overview screen 
    const Back = () => {
        navigate('/ProjectOverview');
    };
    //handles the form for the update of the project 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/project/${id}`, project);
            setMessage('Project updated');
        } catch (error) {
            console.error('Error updating');
            setMessage('Project update failed');
        }
    };

    return (
        <form class="center" onSubmit={handleSubmit}>
            <div>Update</div>
            <button onClick={Back}>Back</button>

            <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={project.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lead"
                placeholder="Lead Name"
                value={project.lead}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={project.description}
                onChange={handleChange}
                required
            />
            <input 
                type="text"
                name="type"
                placeholder="Type"
                value={project.type}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
            <div>{message}</div>

            <ul >
                Set Users:
                {usernames.map((user) => (
                    <li key={user.id}>
                        
                        <button
                            onClick={() => setAsLead(user.id, user.displayName)}
                            type="button"
                        >
                            {user.displayName}
                        </button>
                    </li>
                ))}
            </ul>
        </form>
    );
};

export default ProjectUpdate;
