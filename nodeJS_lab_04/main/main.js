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

async function search(url_path, response) {
    var que = url_path.query;
    var type_data = que.type;
    var url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + type_data;

    var check = cache.check(url);
    time = Date.now();
    try {
        switch (type_data) {

            case "chain" : {
                url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + "album";
                check = await cache.check(url);
                if (check == "empty") {
                    var result = await new Promise((resolve, reject) => {
                        needle.get(url, function (error, data) {
                            cache.addCache(url, data, time);
                            if (!error) resolve(data);
                            else reject(error);
                        })
                    });
                    response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                }
                else {
                    response.end(JSON.stringify([Date.now() - time, check.body.albums]));
                }
                break;
            }

            case "album" : {
                var result = await promise(que.text, type_data);
                response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                break;
            }

            case "artist" : {
                var result = await promise(que.text, type_data);
                response.end(JSON.stringify([Date.now() - time, result.body.artists]));
                break;
            }

            case "track" : {
                var result = await promise(que.text, type_data);
                response.end(JSON.stringify([Date.now() - time, result.body.tracks]));
                break;
            }

            case "album_plus_artist":
                await bluebird.all([promise(que.text, "album"), promise(que.text, "artist")])
                    .spread(function (album, artist) {
                        var alb = album.body.albums;
                        var art = artist.body.artists;
                        response.end(JSON.stringify([Date.now() - time, alb, art]));
                    });
                break;

            case "album_or_artist":
                var result = await bluebird.any([promise(que.text, "album"), promise(que.text, "artist")]);

                if (result.body.albums)
                    response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                else if (result.body.artists)
                    response.end(JSON.stringify([Date.now() - time, result.body.artists]));

                break;

            case "album_plus_track":
                var result = await bluebird.props(
                    {album: promise(que.text, "album"), track: promise(que.text, "track")}
                );
                var alb = result.album.body.albums;
                var tr = result.track.body.tracks;

                response.end(JSON.stringify([Date.now() - time, alb, tr]));
                break;

            case "all":
                var fst, sec;
                var result = await bluebird.some([promise(que.text, "album"), promise(que.text, "artist"), promise(que.text, "track")], 2);

                if (result[0].body.albums) var fst = result[0].body.albums;
                else if (result[0].body.artists) var fst = result[0].body.artists;
                else if (result[0].body.tracks) var fst = result[0].body.tracks;

                if (result[1].body.albums) var sec = result[1].body.albums;
                else if (result[1].body.artists) var sec = result[1].body.artists;
                else if (result[1].body.tracks) var sec = result[1].body.tracks;

                response.end(JSON.stringify([Date.now() - time, fst, sec]));
                break;

            case "join":
                await bluebird.join(promise(que.text, "album"), promise(que.text, "artist"), function (album, artist) {
                    var alb = album.body.albums;
                    var art = artist.body.artists;
                    response.end(JSON.stringify([Date.now() - time, alb, art]));
                });
                break;
        }
    }
    catch (error) {
        response.end("Error: Catch Error: " + error);
    }
}

exports.start = start;
exports.search = search;