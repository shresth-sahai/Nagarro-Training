const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');

const app=express();
//
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

//we have to make the connection first
mongoose.connect('mongodb://0.0.0.0:27017/userDB',function(err){
    if(err) throw err;
    else{console.log('connection made')};
});
//schema
const userSchema=new mongoose.Schema({
    user:String,
    item:String
})
//model
const User =new mongoose.model('User',userSchema);

// const user1=new User({
//     user:"Deepanshi",
//     item:"Bottle"
// })
// user1.save(function(err){
//   if(err) throw err;
//   else{console.log("item added")};
// })

app.get("/",async(req,res)=>{
    const all= await User.find({});
    // console.log(all);
     res.render("index",{all:all});
});

app.post("/",async(req,res)=>{
     const {user ,item}=req.body;
     const unew=new User({
         user:user,
         item:item
     });
     await unew.save((err)=>{
         if(err) throw err;
         else{ console.log("item added")};
     });
     res.redirect("/");

});
app.listen(3000,()=>{
    console.log("Server listening at port 3000");
});