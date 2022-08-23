const express = require("express");
const router = express.Router();
const {getProfile,getmyProfile} = require("../controllers/profileController");

router.get('/', getmyProfile);
router.get("/:userId",getProfile);
module.exports = router;