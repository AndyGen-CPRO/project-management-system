import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartDetails = ({ closeModal,fetchParts, project, part, token }) => {
    const [editMode, setEditMode] = useState(false);
    const [partTasks, setPartTasks] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (part._id) {
            fetchTasks();
        }
    }, [])

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/project/${project._id}/part/${part._id}/tasks`
                , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPartTasks(response.data);
            setMessage("Fetching project tasks successful.")
        } catch (error) {
            setMessage("Error fetching tasks.")
        }
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/project/${project._id}/part/${part._id}`
                , {
                name,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchParts();
            closeModal(false);
            setMessage("Part update successful.")
        } catch (error) {
            setMessage("Part update failed.")
        }
    };

    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `http://localhost:5000/project/${project._id}/part/${part._id}`
                , {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchParts();
            closeModal(false);
            setMessage("Part deletion successful.")
        } catch (error) {
            setMessage("Part deletion failed.")
        }
    };

    const editBtn = () => {
        setEditMode(!editMode);
        setName(project.name);
        setDescription(project.description);
    }

    //part detail + parts under it
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {!editMode ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{part.name}</h2>
                        <h3 className='text-center font-bold text-grey'>description</h3>
                        <p  className="text-1xl text-gray-800 mb-6 text-center">{part.description}</p>
                        {partTasks.length > 0 ? (
                            <div>
                                <div  class="divide-y divide-gray-100 rounded-md border border-gray-300"></div>
                                <p className="text-1xl font-bold text-gray-800 mb-6 text-center">Tasks:</p>
                                
                                <ul>
                                    {partTasks.map(task => (
                                        <li key={task._id}>{task.name}</li>
                                    ))}
                                </ul>
                                
                            </div>
                            ) : (
                            <>
                                <p>This part has no tasks yet</p>
                            </>
                        )}
                        <button onClick={editBtn} class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Edit</button>
                        {partTasks.length <= 0 && 
                        <button onClick={handleDelete} >Delete</button>}
                        <button onClick={closeModal} class="px-3 py-1 bg-gray-600 text-sm text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300" >Close</button>
                    </>
                ) : (
                    <>
                    <h2>Edit Part</h2>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Project Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description: <i>Optional, but recommended</i></label>
                            <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </form>
                    </>
                )}
            </div>
        </div>
    )
};

export default PartDetails;