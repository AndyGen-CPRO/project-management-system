const express = require('express');
const router = express.Router();
const {createProject, getAllProjects, updateProject,deleteProject,getProjectById} = require("../controllers/projectCreationController");


router.post('/project',createProject)


router.get('/projects',getAllProjects)

router.get('/project/:id',getProjectById)

router.put('/project/:id',updateProject)

router.delete('/project/:id',deleteProject)

module.exports = router;