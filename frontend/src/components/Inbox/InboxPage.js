import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import './Inbox.css';

const InboxPage = () => {
    const [inbox, setInbox] = useState([]);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (token) {
            fetchInbox();
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    const fetchInbox = async () => {
        try {
            const response = await axios.get("http://localhost:5000/inbox/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInbox(response.data);
        } catch (error) {
            alert("Error fetching user inbox:", error.message);
        }
    };

    const handleAccept = async (inviteToken, status) => {
        try {
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
            alert("Error accepting invite:", error.message);
        }
    };

    return (
        <div className="inbox-container">
            <h1 className="inbox-title">Inbox</h1>
            {inbox.length > 0 ? (
                <table className="inbox-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Status</th>
                            <th>Date Sent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inbox.map((item) => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>{item.status}</td>
                                <td>{new Date(item.dateSent).toLocaleDateString()}</td>
                                <td>
                                    {item.status !== "accepted" ? (
                                        <button
                                            className="accept-button"
                                            onClick={() =>
                                                handleAccept(item.invitationToken, item.status)
                                            }
                                        >
                                            Accept
                                        </button>
                                    ) : (
                                        <span className="accepted-text">Accepted</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-inbox-message">You have no messages in your inbox.</p>
            )}
        </div>
    );
};

export default InboxPage;
