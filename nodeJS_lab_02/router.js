var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');
var ws = require('./ws');

var main = require('./main');
var update = require('./update');
var chapter = require('./chapter');

function router(req, res) {
    var url_path = url.parse(req.url, true);
    switch(url_path.pathname) {
        case "/" : main.start_page(url_path, res); break;
        case "/info" : main.getinfo(url_path, res); break;
        case "/add" : post(req, res, main.addStat); break;
        case "/delete" : main.deleteStat(url_path, res); break;
        case "/update" : post(req, res, update.updateStat); break;
        case "/uppage" : update.updatePage(url_path, res); break;
        case "/search" : main.searchStat(url_path, res); break;
        case "/sort" : main.sortStat(url_path, res); break;
        case "/chapter" : chapter.chapterInfo(url_path, res); break;
        case "/add_chap" : post(req, res, chapter.addChap); break;
        case "/delete_chap" : chapter.deleteChap(url_path, res); break;
        case "/chap_info" : chapter.chapters(url_path, res); break;
        case "/log" : main.getLog(url_path, res); break;
        case "/upinfo" : update.upinfo(url_path, res); break;
        case "/limit" : main.limit(url_path, res); break;
        case "/sub" : main.subPage(url_path, res); break;
        default : console.log(url_path.pathname);
    }
}

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

exports.router = router;