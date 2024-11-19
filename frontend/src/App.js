// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// ORIGINAL VERSION
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import ProjectOverview from './components/ProjectOverview'
// import ProjectCreation from './components/ProjectCreation';
// import ProjectUpdate from './components/ProjectUpdate';

// const App = () => {


//   function  ProfilePage (){
//     let {id} = useParams

//   }
//   return (
//     <Router>
//       <nav>
//         <Link to="/register">Register</Link>
//         <p></p>
//         <Link to="/login">Login</Link>
//       </nav>

//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/ProjectOverview" element={<ProjectOverview />} />
//         <Route path="/ProjectCreation" element={<ProjectCreation />} />
//         <Route path="/ProjectUpdate/:id" element={<ProjectUpdate />} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;


// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// VERSION 2
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProjectOverview from './components/ProjectOverview';
import ProjectCreation from './components/ProjectCreation';
import ProjectUpdate from './components/ProjectUpdate';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <aside className="sidebar">
          <nav>
            <div>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'link active' : 'link')}
              >
                Register
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'link active' : 'link')}
              >
                Login
              </NavLink>
            </div>
          </nav>
        </aside>

        <div className="main-content">
          <main className="content">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ProjectOverview" element={<ProjectOverview />} />
              <Route path="/ProjectCreation" element={<ProjectCreation />} />
              <Route path="/ProjectUpdate/:id" element={<ProjectUpdate />} />
            </Routes>
          </main>
          <footer className="footer">
            <div>© Fall 2024 Term - CPRO 2101 A - Full Stack Java Script | Project Management System</div>
            <div>Created by Bromling, Generoso, and Victoriano</div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;


// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
// VERSION 3
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

