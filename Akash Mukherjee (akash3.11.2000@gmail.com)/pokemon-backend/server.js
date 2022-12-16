const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    fs.readFile(__dirname +"/public"+ (req.url === "/" ? "/index.html" : req.url), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
  });
