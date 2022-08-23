const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logout, authenticateGoogle,authenticateGoogleRedirect} = require("../controllers/userController");

router.get("/google", authenticateGoogle);
router.get("/google/callback", authenticateGoogleRedirect);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
module.exports = router;