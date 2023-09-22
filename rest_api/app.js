require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const movieRoutes=require("./routes/movie");
const app=express();

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected")).catch((err)=>{
    console.log(err);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",movieRoutes);

app.listen(3000,()=>{
    console.log("Server started  at port 3000");
});
