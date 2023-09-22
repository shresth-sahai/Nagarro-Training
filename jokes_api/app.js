require('dotenv').config();
const express=require('express');
const bodyparser=require('body-parser');
const mysql=require('mysql');
const ejs=require('ejs');


const app=express();
// middleware
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));

const connection=mysql.createConnection({
    user:'testuser',
    password:'deep2403!@#&',
    host:'localhost',
});

connection.connect(function(err){
    if(err) throw err;
    else{console.log("Succesfully Connected");}
});

connection.query('CREATE DATABASE IF NOT EXISTS jkdatabase',function(err){
    if(err) throw err;
    else{
        console.log("Database created");      
    }
});
connection.query('USE jkdatabase',function(err){
    if(err) throw err;
    else{
        console.log("Database changed");      
    }
});
connection.query('CREATE TABLE jokes (id int,joke varchar(1000))',function(err,result){
    if(err) throw err;
    else{console.log("table created")}
});
//we have to generate a random joke when we are going to the website
//we can be able to retrive a joke based on id from the database
// app.get('/',(req,res)=>{
//       const url='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit';
//       fetch(url)
//       .then(data=>data.json())
//       .then(
//           connection.query='INSERT INTO '
//        )
// })

app.listen(3000,()=>{
     console.log("Server is listening at port 3000");
})

//https://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0oCxKYG7xaZwy2ktIrVmWGdWzxj%2FDhHQaAqqFYTiRTDE%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU%2BO86JjTqdg0yhuGR2tBukmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulHLL4j%2B3qCcW3ReXhfb4KKsSs3zlQ%2B48KY6Qzm7wzZbR&at=freeAcct&Email=