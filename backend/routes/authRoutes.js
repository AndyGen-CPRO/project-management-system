const express = require("express");
const router = express.Router();
const { register, login,getUsers } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authenticate, (req, res) => {
  res.send("This is a protected route. You are authenticated!");
});
router.get("/Usernames",getUsers)

module.exports = router;