var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');
var needle = require('needle');
var bluebird = require('bluebird');
var cache = require('./cache');

var time;

function start(url_path, response) {
    fs.readFile("./index.html", function(er, data){
        response.end(data);
    });
}

function promise(text, type) {

    var url = "https://api.spotify.com/v1/search?q=" + text + "&type=" + type;
    var array = cache.check(url);

    if (array == "empty")
        return new Promise((resolve, reject) => {
            needle.get(url, function (error, data) {
                cache.addCache(url, data, time);
                if (!error) resolve(data);
                else reject(error);
            })
        });
    else return Promise.resolve(array);
}

function search(url_path, response) {
    var que = url_path.query;
    var type_data = que.type;
    var url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + type_data;

    var check = cache.check(url);
    time = Date.now();
    switch (type_data) {

        case "chain" : {
            url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + "album";
            check = cache.check(url);
            new Promise((resolve, reject) => {
                if (check == "empty") resolve(check);
                else resolve("cache");
            }).then(
                data => {
                    if (data == "cache")
                        return check;
                    else return new Promise((resolve, reject) => {
                        needle.get(url, function (error, data) {
                            cache.addCache(url, data, time);
                            if (!error) resolve(data);
                            else reject(error);
                        })
                    });
                }
            ).then(
                data => {
                    response.end(JSON.stringify([Date.now() - time, data.body.albums]));
                }
            ).catch(
                error => {
                    response.end("Error: " + error);
                }
            )
            break;
        }

        case "album" : {
            promise(que.text, type_data).then(
                result => {
                    response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                },
                error => {
                    response.end("Error: " + error);
                }
            )
            break;
        }

        case "artist" : {
            promise(que.text, type_data).then(
                result => {
                    response.end(JSON.stringify([Date.now() - time, result.body.artists]));
                },
                error => {
                    response.end("Error: " + error);
                }
            );
            break;
        }

        case "track" : {
            promise(que.text, type_data).then(
                result => {
                    response.end(JSON.stringify([Date.now() - time, result.body.tracks]));
                },
                error => {
                    response.end("Error: " + error);
                }
            );
            break;
        }

        case "album_plus_artist":
            bluebird.all([promise(que.text, "album"), promise(que.text, "artist")])
                .spread(function (album, artist) {
                    var alb =  album.body.albums;
                    var art = artist.body.artists;
                    response.end(JSON.stringify([Date.now() - time, alb, art]));
                }).catch(
                    error => {
                        response.end("Error: " + error);
                    }
            );
            break;

        case "album_or_artist":
            bluebird.any([promise(que.text, "album"), promise(que.text, "artist")])
                .then(
                    result => {
                        if (result.body.albums)
                            response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                        else if (result.body.artists)
                            response.end(JSON.stringify([Date.now() - time, result.body.artists]));
                    },
                    error => {
                        response.end("Error: " + error);
                    }
                );
            break;

        case "album_plus_track":
            bluebird.props({album : promise(que.text, "album"), track : promise(que.text, "track")})
                .then(
                    result => {
                        var alb = result.album.body.albums;
                        var tr = result.track.body.tracks;
                        response.end(JSON.stringify([Date.now() - time, alb, tr]));
                    },
                    error => {
                        response.end("Error: " + error);
                    }
                );
            break;

        case "all":
            bluebird.some([promise(que.text, "album"), promise(que.text, "artist"), promise(que.text, "track")], 2)
                .then(
                    result => {
                        var fst, sec;

                        if (result[0].body.albums) var fst = result[0].body.albums;
                        else if (result[0].body.artists) var fst = result[0].body.artists;
                        else if (result[0].body.tracks) var fst = result[0].body.tracks;

                        if (result[1].body.albums) var sec = result[1].body.albums;
                        else if (result[1].body.artists) var sec = result[1].body.artists;
                        else if (result[1].body.tracks) var sec = result[1].body.tracks;

                        response.end(JSON.stringify([Date.now() - time, fst, sec]));
                    },
                    error => {
                        response.end("Error: " + error);
                    }
                );
            break;

        case "join":
            bluebird.join(promise(que.text, "album"), promise(que.text, "artist"), function (album, artist) {
                var alb =  album.body.albums;
                var art = artist.body.artists;
                response.end(JSON.stringify([Date.now() - time, alb, art]));
            }).catch(
                error => {
                    response.end("Error: " + error);
                }
            )
            break;
    }
}

exports.start = start;
exports.search = search;