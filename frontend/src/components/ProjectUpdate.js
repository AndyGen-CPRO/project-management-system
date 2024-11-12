import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'



const ProjectUpdate = () => {
    const navigate = useNavigate()
    const {id} = useParams(); //this is your problem future you this is undefined 

    const  [project,setProject] = useState({name: '', lead: '', userId: 'test', description: '', type: '' })
    const  [usernames,setUsernames] = useState({_id: '', displayName: '' })
    
    const [message, setMessage] = useState("")
    //fetches the project chosen to be updated to provide the current information 
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const responce = await axios.get(`http://localhost:5000/api/project/${id}`)
                setProject(responce.data,)

            }catch(error){
                console.error('Error fetching Project',error)
                setMessage(`Updating project ${project.name}`)
            }

        }
        fetchProject()
    },[id]);


    //gets the usernames and Id of all users for the dropdown menu
    useEffect(() =>{
        const fetchUsername = async () => {
            try{
                const responce = await axios.get('http://localhost:5000/api/Usernames')
                setUsernames(responce.data)

            }
            catch(error){
                console.error('Error fetching Project',error)
                setMessage('There was a problem loiading Users')

            }

        }
        fetchUsername()
    },[])


    const handleChange = (e) => {
        setProject({...project,[e.target.name]: e.target.value})
    }


    const Back = () =>{
        navigate('/ProjectOverview')
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:5000/api/project/${id}`,project)
            setMessage('project updated')

            
        }catch(error){
            console.error('Error updating')
            setMessage('project update Failed')
            
        }
    }



    return (
        <form onSubmit={handleSubmit}>
    
    
    <div>Update</div>
    <button onClick={Back}>back</button>


    <input 
        type="text" 
        name = "name"
        placeholder="Project Name" 
        value={project.name} 
        onChange={handleChange}
        required
    /> 
        <input 
        type="text" 
        name = "lead"
        placeholder="Lead Name" 
        value={project.lead} 
        onChange={handleChange}
        required
    />
        <input 
        type="text" 
        name ="description"
        placeholder="Description" 
        value={project.description} 
        onChange={handleChange}
        required
    />
        <input 
        type="text" 
        name = "type"
        placeholder="Type" 
        value={project.type} 
        onChange={handleChange}
        required
    />
        <button type='submit'>submit</button>
       <div>{message} </div>



    </form>)
}

export default ProjectUpdate;