const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createProject, getProjectById, getAllProjects, updateProject, deleteProject
 } = require("../controllers/projectController")


router.post("/create", authenticate, createProject);
router.get("/", authenticate, getAllProjects);
router.get("/:projectId", authenticate, getProjectById);
router.put("/:projectId", authenticate, updateProject);
router.delete("/:projectId", authenticate, deleteProject);

module.exports = router;
