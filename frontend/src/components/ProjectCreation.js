import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'




const ProjectCreation = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [lead, setLead] = useState("");
    const [userId, setuserId] = useState("672eeba65175d6d1c26aee0e");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [message, setMessage] = useState("")
    const [usernames, setUsernames] = useState([]);
    const defaultId = "672eeba65175d6d1c26aee0e"

    //functionality of the back button that returns the user to the overview screen 
    const Back = () =>{
        navigate('/ProjectOverview')
    }
    //handles the form submission for creating a project 
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/project",{name,lead,userId,description,type});
            setMessage(response.data.message);
            setMessage("Project Created");

            
        }catch(error){
            setMessage("Upload failed")
        }
    }

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

//changes the new project's id and lead name to a valid user
const setAsLead = (id,displayName) => {
    console.log(displayName)
    setLead(displayName)
    setuserId(id)


    
}
    
    
    


    return (
        <form class="center" onSubmit={handleSubmit}>
    
    
    <div>Creation</div>
    <button onClick={Back}>back</button>


    <input 
        type="text" 
        placeholder="Project Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
    />
   
        
   
   <input 
        type="text" 
        placeholder="lead" 
        value={lead} 
        onChange={(e) => setLead(e.target.value)} 
        required
        readOnly
    />
        



        <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required
    />
        <input 
        type="text" 
        placeholder="Type" 
        value={type} 
        onChange={(e) => setType(e.target.value)} 
        required
    />
        <button type='submit'>submit</button>
       <div>{message}</div>

       <ul> Users: 
            {usernames.map((user) =>(
                <li key={user.id}>
                     {user.displayName}
                     <button onClick={() => setAsLead(user.id, user.displayName)} type='button'> Set as lead</button>


                    
                </li>
            ))}

        </ul>

    </form>
    

)
}


export default ProjectCreation;