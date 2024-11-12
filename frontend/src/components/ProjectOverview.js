import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'





    const ProjectOverview =() => {
        const navigate = useNavigate()
        const [projects,setProjects] = useState([])
        
        useEffect(() =>{
        const fetchProjects = async () => {
            try{
                const responce = await axios.get('http://localhost:5000/api/projects');
                setProjects(responce.data)
            }catch(error) {
                console.error("Error fetching Project",error)
            }
        };

        fetchProjects()
},[]);


const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/project/${id}`)
        setProjects(projects.filter((project)=> project._id !==id));
    }
    catch (error){
        console.error('Error deleteing project',error)
    }
};

const handleUpdate = async (id)=>{
    navigate(`/ProjectUpdate/${id}`)
}


    const redirectToCreation = () =>{
        navigate('/ProjectCreation')
        
        
    }
    

    return (
        <div>
        <button onClick={redirectToCreation}>Create Project</button>
        <h1>Project overview</h1>
        <ul>
            {projects.map((project) =>(
                <li key={project.id}>
                    {project.name} - {project.lead}-{project.userId}-{project.description} - {project.type} 
                    <button onClick={() => handleDelete(project._id)}> Delete</button>
                    <button onClick={()=> handleUpdate(project._id)}>Update</button>
                </li>
            ))}

        </ul>

        </div>
    )

}


 export default ProjectOverview;