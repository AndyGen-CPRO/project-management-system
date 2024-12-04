const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { 
    createPart, getPartById, getAllParts, updatePart, deletePart
 } = require("../controllers/partController")

router.post("/:projectId/parts/create", authenticate, createPart);
router.get("/:projectId/parts", authenticate, getAllParts);
router.get("/:projectId/part/:partId", authenticate, getPartById);
router.put("/:projectId/part/:partId", authenticate, updatePart);
router.delete("/:projectId/part/:partId", authenticate, deletePart);

module.exports = router;