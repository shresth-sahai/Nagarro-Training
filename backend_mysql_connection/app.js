require('dotenv').config();
const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mysql=require('mysql');

const app=express();

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs')

const connection=mysql.createConnection({
     user:'testuser',
     password:process.env.PASSWORD,
     host:process.env.HOST,
     database:process.env.DB
})
connection.connect(function(err){
    if(err) throw err;
    else{
        console.log('connection made');
    }
});
connection.query('CREATE TABLE IF NOT EXISTS')
app.listen(process.env.PORT,()=>{
   console.log("Server is running at "+process.env.PORT);
})