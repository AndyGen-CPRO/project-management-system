import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import CreateTask from './CreateTaskModal';

const Tasks = () => {
    const { state } = useLocation();
    const project = state?.project;
    const [parts, setParts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        const fetchParts = async () => {
            try {
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/parts/${project._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setParts(response.data);
                setMessage("Fetching project parts successful.")
            } catch (error) {
                setMessage("Error fetching parts.")
            }
        };

        if (project._id) {
            fetchParts();
        }
        const fetchTasks = async () => {
            try {
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/tasks/${project._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
                setMessage("Fetching project tasks successful.")
            } catch (error) {
                setMessage("Error fetching tasks.")
            }
        };

        if (project._id) {
            fetchTasks();
        }
    }, []);

    const getPartName = (partId) => {
        const part = parts.find(p => p._id === partId);
        return part ? part.name : "Unknown Part";
    };
    return (
        <div>
            <h2>{project.name} Tasks</h2>
            <button onClick={() => setCreateTaskModal(true)}>Create Task</button>
            {createTaskModal && 
            <CreateTask
                closeModal={() => setCreateTaskModal(false)}
                project={project}
                parts={parts}
                token={token}
            />}
            <table>
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{getPartName(task.partId)}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks;