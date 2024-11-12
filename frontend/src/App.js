import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProjectOverview from './components/ProjectOverview'
import ProjectCreation from './components/ProjectCreation';
import ProjectUpdate from './components/ProjectUpdate';

const App = () => {


  function  ProfilePage (){
    let {id} = useParams

  }
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link>
        <p></p>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ProjectOverview" element={<ProjectOverview />} />
        <Route path="/ProjectCreation" element={<ProjectCreation />} />
        <Route path="/ProjectUpdate/:id" element={<ProjectUpdate />} />
      </Routes>
    </Router>
  );
};
export default App;