const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    addProjectMember, getProjectMembers, getProjectMemberRole, updateMemberRole, removeProjectMember
} = require("../controllers/projectMemberController");

router.post("/:projectId/members/add", authenticate, addProjectMember);
router.get("/:projectId/members", authenticate,getProjectMembers);
router.get("/:projectId/member-role", authenticate, getProjectMemberRole)
router.put("/:projectId/member/:userId", authenticate, updateMemberRole);
router.delete("/:projectId/member/:userId", authenticate, removeProjectMember);

module.exports = router;