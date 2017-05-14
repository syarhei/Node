'use strict';

var url = require('url');
var query = require('querystring');

var main = require('./main');

function router(req, res) {
    var url_path = url.parse(req.url, true);
    switch (url_path.pathname) {
        case "/":
            main.start(url_path, res);break;
        case "/search":
            main.search(url_path, res);break;
    }
}

/*
function post(req, res, fun) {
    var body = "";
    req.on("data", function(chunk) {
        body += chunk;
    });
    req.on("end", function() {
        var post_req = query.parse(body);
        fun(post_req, res);
    });
}
*/

exports.router = router;