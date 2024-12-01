const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware")


const { addMessage ,getInbox} = require("../controllers/inboxController")



router.post("/create/:projectId", authenticate, addMessage);
router.get("/", authenticate, getInbox);


module.exports = router;