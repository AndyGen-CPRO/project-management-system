import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ProjectDelete from './ProjectDeleteModal';

const ProjectDetails = ({ closeModal, project, fetchProject, token, role }) => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/projects/${project._id}`, {
                name,
                startDate,
                endDate,
                description,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            closeModal(false);
            fetchProject();
            setMessage("Project update successful.")
        } catch (error) {
            setMessage("Project update failed.")
        }
    };

    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `http://localhost:5000/projects/${project._id}`
                , {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            fetchProject();
            closeModal(false);
            navigate("/projects")
            alert("Project deletion successful.")
        } catch (error) {
            alert("Project deletion failed.")
        }
    };

    const editBtn = () => {
        setEditMode(!editMode);
        setName(project.name);
        setStartDate(project.startDate);
        setEndDate(project.endDate);
        setDescription(project.description);
        setStatus(project.status);
    }

    if (!project) {
        return (
            <div>
                <p>Project Loading...</p>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content">
                <div>
                {!editMode ? ( 
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" >Project Details</h2>
                        <label className="block text-gray-700 font-medium mb-1">Project Name:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{project.name}</p>
                        <label className="block text-gray-700 font-medium mb-1">Description:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{project.description}</p>
                        <label className="block text-gray-700 font-medium mb-1">Start Date:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{new Date(project.startDate).toLocaleDateString()}</p>
                        <label className="block text-gray-700 font-medium mb-1">End Date:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{new Date(project.endDate).toLocaleDateString()}</p>
                        <label className="block text-gray-700 font-medium mb-1">Status:</label>
                        <p className="px-4 py-2 text-sm text-gray-600">{project.status}</p>
                                                
                        <div className="flex space-x-2 mb-2 px-2 pt-3">
                            {role === "Owner" && 
                            <button onClick={editBtn} 
                                class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded shadow 
                                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Edit</button>}
                            <button onClick={() => setConfirmDeleteModal(true)}
                                class="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded shadow 
                                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Delete</button>
                            <button onClick={() => closeModal(false)} class="px-3 py-1 bg-gray-600 text-sm text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300">Close</button>
                        </div>
                        {confirmDeleteModal && (
                            <ProjectDelete 
                            onConfirm={handleDelete}
                            onCancel={() => setConfirmDeleteModal(false)}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Project</h2>
                        {message && <p>{message}</p>}
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Project Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="C# Final Project"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Start Date:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                    className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">End Date:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                    className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1" >Description: <i>Optional, but recommended</i></label>
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="C# Final Project"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="resize-none w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700 font-medium mb-1">Status</label>
                                <select 
                                
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="" disabled selected>Select Status...</option>
                                    <option value="on-going">On-Going</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                            <div className="flex-row space-y-2 mb-2 px-2 pt-3">
                                <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"  type="submit">Save</button>
                                <button onClick={() => setEditMode(false)} className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300">Cancel</button>
                            </div>
                        </form>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}   

export default ProjectDetails;