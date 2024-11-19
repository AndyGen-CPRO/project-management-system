const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createTask, getTaskById, getAllTasksByProject, getAllTasksByPart, updateTask, deleteTask
 } = require("../controllers/taskController")

router.post("/:projectId/create", authenticate, createTask);
router.get("/:projectId", authenticate, getAllTasksByProject);
router.get("/:partId", authenticate, getAllTasksByPart);
router.get("/:taskId", authenticate, getTaskById);
router.put("/:taskId", authenticate, updateTask);
router.delete("/:taskId", authenticate, deleteTask);

module.exports = router;