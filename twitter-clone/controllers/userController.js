const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const registerUser = (req,res)=> {
    const {name,email,password,confirmPassword} = req.body;
    // console.log('inside register user');
    if(password != confirmPassword) {
        res.redirect("/");
    }
    else {
        db.searchByValue({
            table:"user",
            searchAttribute:"email",
            searchValue:email,
            attributes:["*"]
        })
        .then((result)=>{
            // console.log(result);
            const data = result.data;
            if(data.length != 0) {
                res.redirect("/");
            }
            else {
                bcrypt.hash(password,10,(err,newPassword)=>{
                    if(err) {
                        console.log(err);
                    }else {
                        db.insert({
                            table:"user",
                            records:[{
                                name: name,
                                email: email,
                                password: newPassword,
                                username: email.split("@")[0],
                            }]
                        })
                        .then((result) => {
                            console.log(result);
                            passport.authenticate("local")(req, res, () => {
                              res.redirect("/home");
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            res.redirect("/");
                          });
                    }
                })
            }
            
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    }
}
const loginUser = (req,res)=>{
    passport.authenticate("local",{failureRedirect:"/"})(req,res,()=>{
        // res.json("Authenticated ");
        res.redirect("/home");
    })
}
const logout = (req,res)=>{
    req.logout(err=>{
        if(err) {
            console.log(err);
        }
        // res.json("logout ");
        res.redirect("/");
    })
}
const authenticateGoogle = ()=> {
    passport.authenticate("google", {
        scope: ["profile", "email"],
    });
}
const authenticateGoogleRedirect = ()=> {
    console.log("under redirect");
    passport.authenticate("google", {
        successRedirect: "/home",
        failureRedirect: "/",
    });
}
module.exports={registerUser,loginUser,logout,authenticateGoogle,authenticateGoogleRedirect};