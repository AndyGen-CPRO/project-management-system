// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// ORIGINAL VERSION
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import {useNavigate,useParams} from 'react-router-dom'

// const ProjectUpdate = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [project, setProject] = useState({
//         name: '',
//         lead: '',
//         userId: 'test',
//         description: '',
//         type: ''
//     });
//     const [usernames, setUsernames] = useState([]);
//     const [message, setMessage] = useState("");

//     // Fetch project data by ID
//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/project/${id}`);
//                 setProject(response.data);
//             } catch (error) {
//                 console.error('Error fetching Project', error);
//                 setMessage(`Updating project ${project.name}`);
//             }
//         };
//         fetchProject();
//     }, [id]);

//     // Fetch usernames for the dropdown
//     useEffect(() => {
//         const fetchUsername = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/Usernames');
//                 setUsernames(response.data);
//             } catch (error) {
//                 console.error('Error fetching Project', error);
//                 setMessage('There was a problem loading Users');
//             }
//         };
//         fetchUsername();
//     }, []);
//     //changes the userId and display name whenever 
//     const setAsLead = (id, displayName) => {
//         setProject(prevProject => ({
//             ...prevProject,
//             userId: id,
//             lead: displayName
//         }));
//         console.log(`New lead: ${displayName}`);
//     };
//     //changes the project whenever an input is changed 
//     const handleChange = (e) => {
//         setProject({ ...project, [e.target.name]: e.target.value });
//     };

//     //functionality of the back button that returns the user to the overview screen 
//     const Back = () => {
//         navigate('/ProjectOverview');
//     };
//     //handles the form for the update of the project 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:5000/api/project/${id}`, project);
//             setMessage('Project updated');
//         } catch (error) {
//             console.error('Error updating');
//             setMessage('Project update failed');
//         }
//     };

//     return (
//         <form class="center" onSubmit={handleSubmit}>
//             <div>Update</div>
//             <button onClick={Back}>Back</button>

//             <input
//                 type="text"
//                 name="name"
//                 placeholder="Project Name"
//                 value={project.name}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="lead"
//                 placeholder="Lead Name"
//                 value={project.lead}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="description"
//                 placeholder="Description"
//                 value={project.description}
//                 onChange={handleChange}
//                 required
//             />
//             <input 
//                 type="text"
//                 name="type"
//                 placeholder="Type"
//                 value={project.type}
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Submit</button>
//             <div>{message}</div>

//             <ul >
//                 Set Users:
//                 {usernames.map((user) => (
//                     <li key={user.id}>
                        
//                         <button
//                             onClick={() => setAsLead(user.id, user.displayName)}
//                             type="button"
//                         >
//                             {user.displayName}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </form>
//     );
// };

// export default ProjectUpdate;


// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// VERSION 2
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lead, setLead] = useState("");
  const [userId, setUserId] = useState("test");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [usernames, setUsernames] = useState([]);

  // Fetch project data by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/project/${id}`);
        const { name, lead, userId, description, type } = response.data;
        setName(name);
        setLead(lead);
        setUserId(userId);
        setDescription(description);
        setType(type);
      } catch (error) {
        console.error('Error fetching project data', error);
        setMessage(`There was an error fetching the project data.`);
      }
    };
    fetchProject();
  }, [id]);

  // Fetch usernames for the dropdown
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Usernames');
        setUsernames(response.data);
      } catch (error) {
        console.error('Error fetching usernames', error);
        setMessage('There was a problem loading users');
      }
    };
    fetchUsername();
  }, []);

  const setAsLead = (id, displayName) => {
    setLead(displayName);
    setUserId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/project/${id}`, {
        name,
        lead,
        userId,
        description,
        type,
      });
      setMessage(response.data.message || 'Project updated successfully');
    } catch (error) {
      setMessage('Project update failed. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/ProjectOverview');
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 style={{ textAlign: 'center' }}>Update Project</h2>
      <button type="button" onClick={handleBack} className="back-button">Back</button>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Lead"
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        readOnly
        required
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

      <button type="submit">Submit</button>
      <p>{message}</p>

      <ul>
        <h3>Users:</h3>
        {usernames.map((user) => (
          <li key={user._id} className="user-item">
            {user.displayName}
            <button
              type="button"
              onClick={() => setAsLead(user._id, user.displayName)}
              className="set-lead-button"
            >
              Set as Lead
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default ProjectUpdate;
