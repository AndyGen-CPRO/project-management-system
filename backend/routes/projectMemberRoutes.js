const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    addProjectMember, getProjectMembers, updateMemberRole, removeProjectMember
} = require("../controllers/projectMemberController");

router.post("/:projectId/add", authenticate, addProjectMember);
router.get("/:projectId", authenticate,getProjectMembers);
router.put("/:projectId/:userId", authenticate, updateMemberRole);
router.delete("/:projectId/:userId", authenticate, removeProjectMember);

module.exports = router;