const express = require("express");
const router = express.Router();
const {loginAndSignUp} = require("../controllers/mainPageController");
const {homePage} = require("../controllers/homePageController");

router.get('/',loginAndSignUp);

// passing different pages to be rendered for ex home 
router.get('/:page', homePage);
module.exports = router;