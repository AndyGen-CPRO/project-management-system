import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { getToken } from '../../utils/auth';

const ProjectDetails = ({ closeModal, project, fetchProject }) => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async(e) => {
        e.preventDefault();

        const token = getToken();
        if (!token) {
            setMessage("You need to be logged in.");
            return;
        }
        console.log("Token:", token);

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
        <div className="modal-overlay">
            <div className="modal-content">
                {!editMode ? ( 
                    <>
                        <h2>Project Details</h2>
                        <p>{project.name}</p>
                        <p>{project.description}</p>
                        <p>{project.startDate}</p>
                        <p>{project.endDate}</p>
                        <p>{project.status}</p>
                        <button onClick={editBtn}>Edit</button> 
                        <button onClick={() => closeModal(false)}>Close</button>
                    </>
                ) : (
                    <>
                        <h2>Edit Project</h2>
                        {message && <p>{message}</p>}
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label>Project Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="C# Final Project"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Start Date:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                />
                            </div>
                            <div>
                                <label>End Date:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    required
                                />
                            </div>
                            <div>
                                <label>Description: <i>Optional, but recommended</i></label>
                                <input
                                    type="text"
                                    value={description}
                                    placeholder="C# Final Project"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select Status...</option>
                                    <option value="on-going">On-Going</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}   

export default ProjectDetails;