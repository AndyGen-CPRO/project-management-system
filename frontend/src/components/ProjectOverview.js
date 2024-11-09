import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'





const ProjectOverview =() => {
    const navigate = useNavigate()


    const redirectToCreation = () =>{
        navigate('/ProjectCreation')
        
        
    }
    

    return (
        <div>
        <button onClick={redirectToCreation}>Create Project</button>
        <h1>Project overview</h1>

        </div>
    )

}


 export default ProjectOverview;