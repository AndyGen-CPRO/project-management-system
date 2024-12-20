import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "./App.css";
import Home from './components/Home/HomePage';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Projects from './components/Projects/ProjectsPage';
import CreateProject from './components/Projects/CreateProject';
import ProjectOverview from './components/Projects/ProjectOverviewPage';
import Parts from './components/Parts/PartsPage';
import Tasks from './components/Tasks/TasksPage';
import InboxPage from './components/Inbox/InboxPage';
import Navbar from './components/Nav/NavBar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:id" element={<ProjectOverview />} />
        <Route path="/project/:id/parts" element={<Parts />} />
        <Route path="/project/:id/tasks" element={<Tasks />} />
        <Route path="/inbox" element = {<InboxPage />} />
      </Routes>
    </div>
  );
};
export default App;