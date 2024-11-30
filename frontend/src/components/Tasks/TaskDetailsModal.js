import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import TaskAssignment from './TaskAssignmentModal';

const TaskDetails = ({ closeModal, fetchTasks, getPartName, parts, viewOrEdit, project, task, token }) => {
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

    const taskAssignmentBtn = () => {
        setAssignTask(!assignTask);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {viewOrEdit === "view" && (
                    <div>
                        <h2>{getPartName(task.partId)} : {task.name}</h2>
                        <strong>Description</strong>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                        <ul>
                            {members.map(index => (
                                <li key={index._id}>{index.userId.displayName}</li>
                            ))}
                        </ul>   
                        <button onClick={taskAssignmentBtn}>Assign/Remove Members</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
                {viewOrEdit === "edit" && (
                    <>
                        <h2>Edit Task</h2>
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label>Task Name: </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description: </label>
                                <textarea
                                    type="text"
                                    placeholder="C# Final Project"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                            <label>Due Date: </label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                />
                            </div>
                            <div>
                                <label>Priority: </label>
                                <select  value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="" disabled>...</option>
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label>Status: </label>
                                <select  value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled>...</option>
                                    <option value="incomplete">Incomplete</option>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <button type="submit">Save</button>
                            <button onClick={closeModal}>Cancel</button>
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