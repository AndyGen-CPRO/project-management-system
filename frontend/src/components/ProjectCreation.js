import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



const ProjectCreation = () => {
    const navigate = useNavigate()
    const Back = () =>{
        navigate('/ProjectOverview')
    }



    return (
        <form>
    
    
    <div>Creation</div>
    <button onClick={Back}>back</button>
    </form>)
}

export default ProjectCreation;