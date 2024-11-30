const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    assignMember, getAssignedMembers, removeTaskMember
} = require("../controllers/taskAssignmentController");

router.post("/:projectId/task/:taskId/assign", authenticate, assignMember);
router.get("/:projectId/task/:taskId/members", authenticate,getAssignedMembers);
router.delete("/:projectId/task/:taskId/member/:userId", authenticate, removeTaskMember);

module.exports = router;