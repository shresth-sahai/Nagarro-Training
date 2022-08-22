const express=require("express");
const { getMovie, home, getAll, postMovie } = require("../controllers/movie");
const router = express.Router();

router.get("/",home);
router.get("/all",getAll);
router.get("/movie/:id",getMovie)
router.post("/",postMovie);
module.exports = router;