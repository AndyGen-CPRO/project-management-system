// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// ORIGINAL VERSION
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

//     const ProjectOverview =() => {
//         const navigate = useNavigate()
//         const [projects,setProjects] = useState([])
        
//         useEffect(() =>{
//         const fetchProjects = async () => {
//             try{
//                 const responce = await axios.get('http://localhost:5000/api/projects');
//                 setProjects(responce.data)
//             }catch(error) {
//                 console.error("Error fetching Project",error)
//             }
//         };

//         fetchProjects()
// },[]);

// const handleDelete = async (id) => {
//     try {
//         await axios.delete(`http://localhost:5000/api/project/${id}`)
//         setProjects(projects.filter((project)=> project._id !==id));
//     }
//     catch (error){
//         console.error('Error deleteing project',error)
//     }
// };

// const handleUpdate = async (id)=>{
//     navigate(`/ProjectUpdate/${id}`)
// }

//     const redirectToCreation = () =>{
//         navigate('/ProjectCreation')
        
//     }
    
//     return (
//         <div>
//         <button onClick={redirectToCreation}>Create Project</button>
//         <h1>Project overview</h1>
//         <ul>
//             {projects.map((project) =>(
//                 <li key={project.id}>
//                     {project.name} - {project.lead}-{project.userId}-{project.description} - {project.type} 
//                     <button onClick={() => handleDelete(project._id)}> Delete</button>
//                     <button onClick={()=> handleUpdate(project._id)}>Update</button>
//                 </li>
//             ))}

//         </ul>

//         </div>
//     )

// }

// export default ProjectOverview;


// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// VERSION 2
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ProjectOverview = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
        setMessage("Error fetching projects. Please try again later.");
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/project/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      setMessage("Project deleted successfully.");
    } catch (error) {
      console.error('Error deleting project', error);
      setMessage("Failed to delete project. Please try again.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/ProjectUpdate/${id}`);
  };

  const redirectToCreation = () => {
    navigate('/ProjectCreation');
  };

  return (
    <div className="project-form">
      <h2 style={{ textAlign: 'center' }}>Project Overview</h2>
      <div className='centered-button-container'>
        <button onClick={redirectToCreation} className="button">Create Project</button>
      </div>
      <p>{message}</p>
      <ul className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project._id} className="project-item">
              <div className="project-details">
                <strong>{project.name}</strong> - {project.lead} - {project.userId} - {project.description} - {project.type}
              </div>
              <div className="project-actions">
                <button onClick={() => handleDelete(project._id)} className="button delete-button">Delete</button>
                <button onClick={() => handleUpdate(project._id)} className="button update-button">Update</button>
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No projects available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProjectOverview;
