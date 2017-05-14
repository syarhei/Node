var http = require("http");

var router = require("./router");
var cache = require("./cache");

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    router.router(request, response);
});

server.listen(7700);