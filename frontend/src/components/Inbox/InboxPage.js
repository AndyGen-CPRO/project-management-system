import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const InboxPage = () => {
    const [inbox, setInbox] = useState([]);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (token) {
            fetchInbox();
        } else {
            navigate("/login");
            alert("This page needs authorization to be accessed.")
            return;
    }
    }, []);

    const fetchInbox = async () => {
        try {
            const response = await axios.get("http://localhost:5000/inbox/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInbox(response.data);
        } catch (error) {
            alert("Error fetching user inbox.", error);
        }
    };

    const handleAccept = async (inviteToken, status) => {
        try {
            if (!inviteToken) {
                alert("Invalid invitation token.");
                return;
            }
            if (status === "accepted") {
                alert("Invitation already accepted.");
                return;
            }
            await axios.post(
                `http://localhost:5000/inbox/accept/${inviteToken}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            alert("Invitation accepted successfully!");
            fetchInbox();
        } catch (error) {
            alert("Error accepting invite.", error);
        }
    };

    if(!token) {
        return (
            <p>Inbox Loading...</p>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h1>
            <div>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                Go Back</button>
            </div>
            {inbox.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Body</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Date Sent</th>
                                <th className="px-6 py-3 text-center font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inbox.map((message) => (
                                <tr key={message._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-800">{message.title}</td>
                                    <td className="px-6 py-4 text-gray-800">{message.body}</td>
                                    <td
                                        className={`px-6 py-4 font-semibold ${
                                            message.status === "pending"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {message.status}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(message.dateSent).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleAccept(message.invitationToken, message.status)}
                                            className={`px-4 py-2 rounded shadow text-white font-medium ${
                                                message.status === "pending"
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={message.status !== "pending"}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-lg">You have no invitations in your inbox.</p>
            )}
        </div>
    );
};

export default InboxPage;
