const db = require("../config/dbconfig");
// const {manipulateLike} = require("../utils/functions");

const addTweet = (req, res) => {
    const { tweet, userId } = req.body;
    if (req.isAuthenticated() && tweet !== "") {
      db.insert({
        table: "tweets",
        records: [{ tweet, userId, likeCount: 0 }],
      })
        .then((result) => {
          console.log(result);
          res.status(result.statusCode);
          res.redirect("/home");
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.redirect("/");
        });
    } else {
        res.status(401);
        res.redirect("/");
    }
};
const deleteTweet = (req, res) => {
    if (req.isAuthenticated()) {
      const { id, userId } = req.body;
      const currentUserId = req.user.data[0].id;
      if(currentUserId === userId){
       db.query(
        `DELETE FROM social.tweetLikes WHERE tweetId = "${id}" and userId = "${userId}"`,
        (err,response)=>{
          if(err) {
            console.log(err);
          }
        }
       )
        db.delete(
          {
            table: "tweets",
            hashValues: [id],
          },
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Server Error");
            } else {
              res.status(200).send("Success");
            }
          }
        );
      }
      else{
        res.status(401).send("Unauthorized");
      }
    }
    else{
      res.status(401).send("Unauthorized");
    }
};
const likeTweet = (req, res) => {
    if (req.isAuthenticated()) {
      const { tweetId, userId, isLiked } = req.body;
      db.query(
        `SELECT * FROM social.tweetLikes WHERE tweetId = "${tweetId}" and userId = "${userId}"`,
        (err, response) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server Error");
          } else {
            console.log(response.data);
            if (response.data.length == 0) {
              db.insert({
                table: "tweetLikes",
                records: [ {
                   tweetId:tweetId, 
                   userId:userId, 
                   isLiked:isLiked
                 }],
              })
                .then((result) => {
                  console.log(result);
                  manipulateLike(tweetId, isLiked, res);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send("Error");
                });
            } else {
              db.query(
                `UPDATE social.tweetLikes SET isLiked = ${isLiked} WHERE tweetId = "${tweetId}" and userId = "${userId}"`,
                (err, response) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Error");
                  } else {
                    // console.log(response.data);
                    manipulateLike(tweetId, isLiked, res);
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(401).send("Unauthorized");
    }
};

// binding function to same object by defining it in same file
function manipulateLike(id,isLiked,res){
  db.query(
      `UPDATE social.tweets SET likeCount = likeCount ${
        isLiked ? "+" : "-"
      } 1 WHERE id = "${id}"`,
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error");
        } else {
          res.status(200).send("successfully updated");
        }
      }
  )

}
const getTrendingTweets = (req, res) => {
    db.query(
      `SELECT u.id as userId, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.__createdtime__ as tweetTime FROM social.tweets as t INNER JOIN social.user as u ON u.id = t.userId ORDER BY t.likeCount DESC LIMIT 5`
    )
      .then((result) => {
        const tweets = result.data;
        tweets.forEach((tweet) => {
          tweet.tweetTime =
            (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
          if (tweet.tweetTime >= 24) {
            tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + "d ago";
          } else if (tweet.tweetTime < 1) {
            tweet.tweetTime = "less than 1h ago";
          } else {
            tweet.tweetTime = Math.floor(tweet.tweetTime) + "h ago";
          }
        });
        res.send(tweets);
      })
      .catch((err) => {
        console.log(err);
        res.send([]);
      });
  };
const getTweets = (req, res) => {
    const { userId } = req.params;
    db.query(
      `SELECT u.id as userId, u.email as email, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.likeCount as likeCount, t.__createdtime__ as tweetTime, l.isLiked as isLiked FROM social.tweets as t INNER JOIN social.user as u ON u.id = t.userId LEFT OUTER JOIN social.tweetLikes as l on t.id = l.tweetId AND l.userId = "${userId}" ORDER BY t.__createdtime__ DESC` 
    )
      .then((result) => {
        const tweets = result.data;
        console.log(tweets);
        tweets.forEach((tweet) => {
          tweet.tweetTime =
            (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
          if (tweet.tweetTime >= 24) {
            tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + "d ago";
          } else if (tweet.tweetTime < 1) {
            tweet.tweetTime = "less than 1h ago";
          } else {
            tweet.tweetTime = Math.floor(tweet.tweetTime) + "h ago";
          }
        });
        res.send(tweets);
      })
      .catch((err) => {
        console.log(err);
        res.send([]);
      });
  };
  
module.exports = {addTweet,deleteTweet,likeTweet,getTrendingTweets,getTweets}