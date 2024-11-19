const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createPart, getPartById, getAllParts, updatePart, deletePart
 } = require("../controllers/partController")

router.post("/:projectId/create", authenticate, createPart);
router.get("/:projectId", authenticate, getAllParts);
router.get("/:partId", authenticate, getPartById);
router.put("/:partId", authenticate, updatePart);
router.delete("/:partId", authenticate, deletePart);

module.exports = router;