import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import './Inbox.css' ;

const InboxPage = ()  => {
const [inbox, setInbox] = useState([]);
const navigate = useNavigate();
const token = getToken();

useEffect(() => {
    if (token) {
        fetchInbox(); 
    }
}, [])

const fetchInbox = async(e) => {
    try {
        if (!token) {
            navigate("/login");
            return;
        }

        const response = await axios.get("http://localhost:5000/inbox/", {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        setInbox(response.data)
    } catch (error) {
        alert("Error fetching user inbox.")
    }
}
    return(
        <div>
            <h1>Inbox</h1>
            <table>
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Status</th>
                        <th>Date Sent</th>
                    </tr>
                </thead>
                <tbody>
                {inbox.map(inbox => (
                    <tr key={inbox.senderId.displayName}>
                        <td>{inbox.title}</td>
                        <td>{inbox.body}</td>
                        <td>{inbox.status}</td>
                        <td>{inbox.sentDate}</td>
                        <td><button>Accept</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}


export default InboxPage