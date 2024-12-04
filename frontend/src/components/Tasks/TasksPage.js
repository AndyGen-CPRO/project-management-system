import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import CreateTask from './CreateTaskModal';
import TaskDetails from './TaskDetailsModal';

const Tasks = () => {
    const { state } = useLocation();
    const project = state?.project;
    const role = state?.role;
    const [parts, setParts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [viewOrEdit, setViewOrEdit] = useState("");
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {  
        if (!token) {
            navigate("/login");
            alert("This page needs authorization to be accessed.")
            return;
        }

        if (project._id) {
            fetchParts();
            fetchTasks();
        }
    }, []);
    
    const fetchParts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/project/${project._id}/parts`, {
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

    const fetchTasks = async () => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(`http://localhost:5000/project/${project._id}/tasks`, {
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
    const goBack = () => {
        navigate(-1)
    }

    const getPartName = (partId) => {
        const part = parts.find(p => p._id === partId);
        return part ? part.name : "Unknown Part";
    };

    if(!token || !project) {
        return(
            <p>Project Tasks Loading...</p>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className=" w-2/8 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{project.name} Tasks</h2>
                {role === "Owner" && <button onClick={() => setCreateTaskModal(true)} 
                class="px-4 py-1 text-sm font-bold text-white bg-yellow-600 rounded shadow
                 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                    Create Task</button>}
                {createTaskModal && 
                <CreateTask
                    closeModal={() => setCreateTaskModal(false)}
                    fetchTasks={fetchTasks}
                    project={project}
                    parts={parts}
                    token={token}
                />}
                {tasks.length > 0 ? (<table>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Part</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700" >Task</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Due Date</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td className="px-4 py-2 text-sm text-gray-600">{getPartName(task.partId)}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{task.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{task.description}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{new Date(project.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{task.priority}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{task.status}</td>
                                <td><button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => {setSelectedTask(task); setViewOrEdit("view")}}
                                    >Details</button></td>
                                {/* owner role button */}
                                
                                {role === "Owner" && <td><button 
                                    onClick={() => {setSelectedTask(task); setViewOrEdit("edit")}}
                                    className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >Edit</button></td>}
                            </tr>
                        ))}
                    </tbody>
                        {selectedTask && (
                            <TaskDetails 
                                closeModal={() => {setSelectedTask(null); setViewOrEdit("")}}
                                fetchTasks={fetchTasks}
                                getPartName={getPartName}
                                parts={parts}
                                viewOrEdit={viewOrEdit}
                                project={project}
                                task={selectedTask}
                                token={token}
                                role={role}
                            />
                        )}
                </table>) :
                (
                    <p className="text-gray-500">This project has not task yet.</p>
                )}
                <button onClick={goBack} className="px-3 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Back</button>
            </div>
        </div>
    
    )
}

export default Tasks;