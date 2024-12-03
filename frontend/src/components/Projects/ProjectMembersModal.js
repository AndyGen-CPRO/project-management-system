import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectMembers = ({ closeModal, project, token }) => {
    const [projMembers, setProjMembers] = useState([]);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(project._id) {
            fetchMembers();
        }
    },[])

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/project/${project._id}/members`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjMembers(response.data);
            setMessage("Fetching project members successful.")
        } catch (error) {
            setMessage("Error fetching members.")
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault(); 
        try {
            const responsee = await axios.post(`http://localhost:5000/projects/${project._id}/invite`, {
                receiverEmail,
                title: "Project Invitation",
                body: `You have been invited to Project ${project.name}.`
            },
                 {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            setMessage("Error inviting user.")
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleInvite}>
                    <label>Invite a user with email</label>
                    <input
                        type="text"
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send</button>
                </form>
                <div>
                    {projMembers && (
                        <>
                            <h3>Current Members</h3>
                            <ul>
                            {projMembers.map(member => (
                                <li key={member._id}>{member.userId.displayName}
                                 - Joined At {member.joinedAt} - {member.role}</li>
                            ))}
                            </ul>
                        </>
                    )}
                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
};

export default ProjectMembers;