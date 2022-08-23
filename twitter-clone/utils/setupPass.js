const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const setupPassport = (passport)=> {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, next) => {
          db.searchByValue({
            table: "user",
            searchAttribute: "email",
            searchValue: email,
            attributes: ["*"],
          })
            .then((res) => {
              const users = res.data;
              if (users.length === 0) {
                return next(null, false, { message: "No user found" });
              }
              else{
                const foundUser = users[0];
                bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                  if (err) throw err;
                  if (isMatch) {
                    return next(null, foundUser);
                  } else {
                    return next(null, false, { message: "Either Email or Password is not valid" });
                  }
                })
              }
            })
            .catch((err) => {
              console.log(err);
              return next(err);
            });
        })
      );
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.URL}/auth/google/callback`,
            // passReqToCallback:true
          },
          function (accessToken, refreshToken, profile, done) {
            // console.log("in passport google");
            db.searchByValue({
              table: "user",
              searchAttribute: "email",
              searchValue: profile.emails[0].value,
              attributes: ["*"],
            })
              .then((result) => {
                const userData = result.data;
                // console.log(userData[0]);
                if (userData.length > 0) {
                  return done(null, { id: userData[0].id });
                } else {
                  db.insert({
                    table: "user",
                    records: [
                      {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.emails[0].value.split("@")[0],
                      },
                    ],
                  })
                    .then((result) => {
                      // console.log(result.data.inserted_hashes[0]);
                      return done(null, { id: result.data.inserted_hashes[0] });
                    })
                    .catch((err) => {
                      console.log(err);
                      return done(err, null);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                return done(err, null);
              });
          }
        )
      );
    passport.serializeUser((user,next)=>{
        // setting user id as a cookie
        next(null,user.id);
    });
    passport.deserializeUser((id,next)=>{
        db.searchByHash({
            table:"user",
            hashValues:[id],
            attributes: ["*"]
        },(err,user)=>{
            next(err,user);
        })
    });
}
module.exports = setupPassport;