const express = require("express");
const router = express.Router();
const {addTweet,deleteTweet,likeTweet,getTrendingTweets,getTweets} = require("../controllers/tweetController");

router.post('/add',addTweet);
router.post('/delete',deleteTweet);
router.post("/like", likeTweet);
router.get("/trending", getTrendingTweets);
router.get("/:userId", getTweets);
module.exports = router;