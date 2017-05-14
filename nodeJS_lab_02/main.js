var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');
var bus = require('./bus');
var validate = require('./validate');

function start_page(url_path, response) {
    fs.readFile("./index.html", function(er, data){
        response.end(data);
    });
}

function getinfo(url_path, response) {
    fs.readFile("./file.json", function(er, data){
        response.end(data);
    });
}

function addStat(url_path, response) {
    fs.readFile("./file.json", function(er, data) {
        data = JSON.parse(data);
        if (validate.validate(url_path.id, data)) response.end("error 0");
        else if (!validate.onlyDigit(url_path.id)) response.end("error 1");
        else if (validate.notNull(url_path.header)) response.end("error 2");
        else if (validate.notNull(url_path.comment)) response.end("error 3");
        else {
            data.push({id : url_path.id, header : url_path.header, comment : url_path.comment, chapter : []});
            fs.writeFile("./file.json", JSON.stringify(data), function(er, data) {
                if (er) {
                    return console.log("error");
                }
            })
            bus.emit(1, url_path);
            response.end(JSON.stringify(data));
        }
    });
}

function deleteStat(url_path, response) {
    var que = url_path.query;
    fs.readFile("./file.json", function(er, data) {
        data = JSON.parse(data);
        data.forEach(function (i, index) {
            if (i.id == que.number) {
                bus.emit(2, i);
                data.splice(data.indexOf(i),1);
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

function searchStat(url_path, response) {
    var query = url_path.query;
    fs.readFile('./file.json', function (err, data) {
        data = JSON.parse(data);
        var mas = new Array();
        data.forEach(function (item, index) {
            if (item.header == query.header)
                mas.push({id : item.id, header : item.header, comment : item.comment, chapter : []});
        })
        if (mas.length == 0) response.end("empty");
        else response.end(JSON.stringify(mas));
    });
}

function sortStat(url_path, response) {
    fs.readFile('./file.json', function (err, data) {
        data = JSON.parse(data);
        data.sort(function(a, b){
            var left= parseInt(a.id.toLowerCase()), right=parseInt(b.id.toLowerCase());
            if (left < right) return -1;
            if (left > right) return 1;
            if (left == right) return 0
        })
        fs.writeFile('./file.json',JSON.stringify(data),function(err){
            if(err){
                return console.log(err);
            }
        });
        response.end(JSON.stringify(data));
    });
}

function getLog(url_path, response) {
    fs.readFile('./log.txt', function (err, log) {
        response.writeHead(200,{"Content-Type":"text"});
        response.end(log);
    });
}

function limit(url_path, response) {
    var que = url_path.query;
    if (validate.onlyDigit(que.number)) {
        fs.readFile("./file.json", function(er, data) {
            data = JSON.parse(data);
            data.splice(parseInt(que.number) , parseInt(data.length) - parseInt(que.number));
            response.end(JSON.stringify(data));
        });
    }
    else response.end("Error");

}

function subPage(url_path, res) {
    fs.readFile('./sub.html', function (err, data) {
        res.end(data);
    });
}

exports.start_page = start_page;
exports.getinfo = getinfo;
exports.addStat = addStat;
exports.deleteStat = deleteStat;
exports.sortStat = sortStat;
exports.searchStat = searchStat;
exports.getLog = getLog;
exports.limit = limit;
exports.subPage = subPage;