Apples-MacBook-Pro:NAGARRO shresthsahai$ npm init -y
Wrote to /Users/shresthsahai/Desktop/NAGARRO/package.json:

{
  "name": "nagarro",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


Apples-MacBook-Pro:NAGARRO shresthsahai$ npm install request -S
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 47 packages, and audited 48 packages in 2s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Apples-MacBook-Pro:NAGARRO shresthsahai$ 


API call

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}



var http = require('http');
var url = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}';


var server = http.createServer(function (request, response) {
    //all logic here
    var request = require('request');
    request(url, function (err, res, body)
    {
        var data = JSON.parse(body);
        console.log(data);
        response.write("<html> <body> <div id='container'>");
        response.write("<h1> Visibility - : + data[visibilty] <h1>");
        response.write("<h1> Visibility - : + data[corrdinates] <h1>");
        response.write("<h1> Visibility - : + data[temperature] <h1>");
        response.write("<h1> Visibility - : + data[sunser time] <h1>");
        response.write("<h1> Visibility - : + data[sun rise] <h1>");
       
        response.end();

    })
    

    
}).listen(8081);
