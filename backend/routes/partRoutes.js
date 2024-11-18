const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createPart, getPartById, getAllParts, updatePart, deletePart
 } = require("../controllers/partController")


router.post("/:projectId/create", authenticate, createPart);
router.get("/:projectId", authenticate, getAllParts);
router.get("/:projectId/:partId", authenticate, getPartById);
router.put("/:projectId/:partId", authenticate, updatePart);
router.delete("/:projectId/:partId", authenticate, deletePart);

module.exports = router;