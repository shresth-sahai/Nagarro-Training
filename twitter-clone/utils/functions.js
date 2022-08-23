const db = require("../config/dbconfig");

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
            // console.log(response.data);
            res.status(200).send("OK");
          }
        }
    )

}