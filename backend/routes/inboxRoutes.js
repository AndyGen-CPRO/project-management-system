const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware")
const { acceptInvite, getInbox} = require("../controllers/inboxController")

router.post("/accept/:token", authenticate, acceptInvite)
router.get("/", authenticate, getInbox);

module.exports = router;