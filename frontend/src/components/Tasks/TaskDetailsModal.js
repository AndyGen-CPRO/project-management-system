import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import TaskAssignment from './TaskAssignmentModal';

const TaskDetails = ({ closeModal, fetchTasks, getPartName, parts, viewOrEdit, project, task, token, role }) => {
    const [members, setTaskMembers] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [assignTask, setAssignTask] = useState(false);
    
    useEffect(() => {
        if (project._id) {
            fetchTaskMembers();
        }

        if (task && viewOrEdit === "edit"){
            setName(task.name);
            setDescription(task.description);
            setDueDate(task.dueDate);
            setPriority(task.priority);
            setStatus(task.status);
        }
    }, []);

    const fetchTaskMembers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/project/${project._id}/task/${task._id}/members`
                 , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTaskMembers(response.data);
        } catch (error) {
            alert("Error Fetching Members");
        }
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/project/${project._id}/task/${task._id}`
                , {
                name,
                description,
                dueDate,
                priority,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchTasks();
            closeModal(false);
        } catch (error) {
            alert("Part update failed.")
        }
    };

    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `http://localhost:5000/project/${project._id}/task/${task._id}`
                , {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchTasks();
            closeModal(false);
            alert("Task deletion successful.")
        } catch (error) {
            alert("Task deletion failed.")
        }
    };

    const taskAssignmentBtn = () => {
        setAssignTask(!assignTask);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {viewOrEdit === "view" && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{getPartName(task.partId)} : {task.name}</h2>
                        <label className="block text-gray-700 font-medium mb-1">Description:</label>
                        <p className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{task.description}</p>
                        <label className="block text-gray-700 font-medium mb-1">Due Date:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</p>
                        <label className="block text-gray-700 font-medium mb-1">Priority:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">Priority: {task.priority}</p>
                        <label className="block text-gray-700 font-medium mb-1">Status:</label>
                        <p className="px-4 py-2 text-sm text-gray-600"> {task.status}</p>
                        <label  className="block text-gray-700 font-medium mb-1">Assigned Members:</label>
                        <ul className="px-4 py-2 text-sm text-gray-600">
                            {members.map(index => (
                                <li key={index._id}>{index.userId.displayName}</li>
                            ))}
                        </ul>   
                        <div className="flex space-x-2 mb-2 px-2 pt-3">
                            {role === "Owner" && <>
                            <button onClick={taskAssignmentBtn} 
                                className="px-4 py-1 text-sm font-bold text-white bg-blue-600 rounded shadow 
                                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Assign/Remove Members</button>
                            <button onClick={handleDelete}
                            className="px-4 py-1 text-sm font-bold text-white bg-blue-600 rounded shadow 
                            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >Delete Task</button>
                                </>}
                            <button onClick={closeModal} className="px-4 py-1 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Close</button>
                        </div>
                    </div>
                )}
                {viewOrEdit === "edit" && (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Task</h2>
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Task Name: </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Description: </label>
                                <textarea
                                    type="text"
                                    placeholder="C# Final Project"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="resize-none w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                            <label className="block text-gray-700 font-medium mb-1">Due Date: </label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                    className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">Priority: </label>
                                <select class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="" disabled>...</option>
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">Status: </label>
                                <select class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled>...</option>
                                    <option value="incomplete">Incomplete</option>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <div className="flex-row space-y-2 mb-2 px-2 pt-3">
                                <button  type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">Save</button>
                                <button  onClick={closeModal} className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Cancel</button>
                            </div>
                        </form>
                    </>
                )}

                {assignTask && <TaskAssignment 
                    closeModal={() => setAssignTask(false)}
                    project={project}
                    task={task}
                    token={token}
                />}
            </div>
        </div>
    )
}

export default TaskDetails