const axios = require("axios");

const homePage = (req, res) => {
    if (req.isAuthenticated()) {
      const userData = req.user.data[0];
      axios
        .get(`${process.env.URL}/tweet/${userData.id}`)
        .then((result) => {
          const tweets = result.data;
          // console.log(tweets);
          axios
            .get(`${process.env.URL}/tweet/trending`)
            .then((trendingResult) => {
              const trendingTweets = trendingResult.data;
              // console.log(trendingTweets);
              res.render("main", {
                page: req.params.page,
                tweets,
                userData,
                trendingTweets,
              });
            })
            .catch((err) => {
              console.log(err);
              res.redirect("/");
            });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    } else {
      res.redirect("/");
    }
  };
  module.exports = {homePage};