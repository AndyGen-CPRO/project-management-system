const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createTask, getTaskById, getAllTasksByProject, getAllTasksByPart, updateTask, deleteTask
 } = require("../controllers/taskController")

router.post("/:projectId/tasks/create", authenticate, createTask);
router.get("/:projectId/tasks", authenticate, getAllTasksByProject);
router.get("/:projectId/part/:partId/tasks", authenticate, getAllTasksByPart);
router.get("/:projectId/task/:taskId", authenticate, getTaskById);
router.put("/:projectId/task/:taskId", authenticate, updateTask);
router.delete("/:projectId/task/:taskId", authenticate, deleteTask);

module.exports = router;