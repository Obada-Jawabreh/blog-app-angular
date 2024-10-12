const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const auth= require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get("/get", auth, userController.getUserData);


router.get("/auth/check", auth, (req, res) => {
  res.json({ isAuthenticated: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
module.exports = router;