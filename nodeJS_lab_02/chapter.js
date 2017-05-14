var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');

var numberOfChap = 0;

function chapterInfo(url_path, response) {
    var query = url_path.query;
    numberOfChap = query.number;
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("./chapter.html", function(er, data){
        response.end(data);
    });
}

function chapters(url_path,response){
    var query = url_path.query;
    fs.readFile('./file.json', function (err, data) {
        data = JSON.parse(data);
        //data.splice(query.number,query.number+1);
        data.forEach(function(item,index) {
            if (item.id == numberOfChap) {
                response.end(JSON.stringify(item));
            }

        });
    });
}

function addChap(query,response){
    fs.readFile('./file.json', function (err, data) {
        data = JSON.parse(data);
        data.forEach(function(item,index) {
            if(item.id == numberOfChap){
                item.chapter.push(query.value);
                response.end(JSON.stringify(item));
            }
        });
        fs.writeFile('./file.json',JSON.stringify(data),function(err){
            if(err){
                return console.log(err);
            }
        });
    });
}

function deleteChap(url_path,response){
    var que = url_path.query;
    fs.readFile('./file.json', function (err, data) {
        data = JSON.parse(data);
        data.forEach(function(item) {
            if (item.id == numberOfChap) {
                item.chapter.splice(que.number, 1);
                response.end(JSON.stringify(item));
            }
        })
        fs.writeFile('./file.json',JSON.stringify(data),function(err){
            if(err){
                return console.log(err);
            }
        });
    });
}

exports.chapterInfo = chapterInfo;
exports.chapters = chapters;
exports.addChap = addChap;
exports.deleteChap = deleteChap;