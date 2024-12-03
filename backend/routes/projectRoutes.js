const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createProject, getProjectById, getAllProjects, getAllJoinedProjects, updateProject, deleteProject
 } = require("../controllers/projectController");

const { sendInvitation } = require("../controllers/inboxController");

router.post("/create", authenticate, createProject);
router.get("/", authenticate, getAllProjects);
router.get("/joined-projects", authenticate, getAllJoinedProjects);
router.get("/:projectId", authenticate, getProjectById);
router.put("/:projectId", authenticate, updateProject);
router.delete("/:projectId", authenticate, deleteProject);

//project invitation route
router.post("/:projectId/invite", authenticate, sendInvitation);

module.exports = router;
