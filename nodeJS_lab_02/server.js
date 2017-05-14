var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');

var router = require("./router");

var server = http.createServer(function(request, response) {
    var date = new Date();
    var urlParsed = url.parse(request.url, true);
    fs.appendFile("log.txt", date.getHours() + " " +
        "  " + date.getMinutes() +
        "   " + request.url +
        "  " + request.method +
        " <br>\n",  function (err) {
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    router.router(request, response);
});
server.listen(7700);