var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');
var bus = require('./bus');

var updateOfNumber = 0;

function upinfo(url_path, response) {
    var ndata;
    fs.readFile("./file.json", function(er, data){
        data = JSON.parse(data);
        data.forEach(function (item, index) {
            if (item.id == updateOfNumber) {
                data.push({id : item.id, header : item.header, comment : item.comment, chapter : []})
            }
        })
        response.end(JSON.stringify(data));
    });
}

function updatePage(url_path, response) {
    var que = url_path.query;
    updateOfNumber = que.number;
    fs.readFile("./update.html", function(er, data){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(data);
    });
}

function updateStat(url_path, response) {
    fs.readFile("./file.json", function(er, data) {
        data = JSON.parse(data);
        data.forEach(function (i, index) {
            if (i.id == updateOfNumber) {
                bus.emit(3, i.header + " на статью " + url_path.header);
                //i.id = url_path.id;
                i.header = url_path.header;
                i.comment = url_path.comment;
            }
        })
        fs.writeFile("./file.json", JSON.stringify(data), function(er, data) {
            if (er) {
                return console.log("error");
            }
        });
        response.end(JSON.stringify(data));
    });
}

exports.upinfo = upinfo;
exports.updatePage = updatePage;
exports.updateStat = updateStat;