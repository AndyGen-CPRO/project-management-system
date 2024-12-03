import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectMembers = ({ closeModal, project, token, role }) => {
    const [projMembers, setProjMembers] = useState([]);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (project._id) {
            fetchMembers();
        }
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/project/${project._id}/members`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProjMembers(response.data);
            setMessage("");
        } catch (error) {
            alert("Error fetching members.");
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:5000/projects/${project._id}/invite`,
                {
                    receiverEmail,
                    title: "Project Invitation",
                    body: `You have been invited to Project ${project.name}.`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Invitation sent successfully!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error inviting user.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Project Members</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Invitation Form */}
                {role === "Owner" && <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Invite a user by email
                        </label>
                        <input
                            type="email"
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            required
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Send Invitation
                    </button>
                    {message && (
                        <p className="text-sm text-red-500 mt-2">{message}</p>
                    )}
                </form>}

                {/* Project Members List */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Current Members
                    </h3>
                    {projMembers.length > 0 ? (
                        <ul className="space-y-2">
                            {projMembers.map((member) => (
                                <li
                                    key={member._id}
                                    className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow"
                                >
                                    <div className="flex-shrink-0">
                                        <p className="font-medium text-gray-800">
                                            {member.userId.displayName}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            Joined At: {new Date(member.joinedAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600">Role: {member.role}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No members found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectMembers;
