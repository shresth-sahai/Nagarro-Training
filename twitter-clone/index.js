const express = require('express');
const passport = require("passport");
const session = require("express-session");

const app = express();
const router = require('./routes/index');
const userRouter = require("./routes/userRoutes");
const tweetRouter = require("./routes/tweetsRoutes");
const profileRouter = require("./routes/profileRoutes");
const setupPassport = require("./utils/setupPass");

require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static("public"));

//--------------passport setup starts--------
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
setupPassport(passport);
//--------------passport setup ends--------

app.use("/auth",userRouter);
app.use("/tweet",tweetRouter);
app.use("/profile",profileRouter);
app.use("/",router);
const PORT = process.env.PORT ||8000;
const server = app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})
