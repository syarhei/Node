'use strict';

var search = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url_path, response) {
        var que, type_data, url, check, result, alb, tr, fst, sec;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        que = url_path.query;
                        type_data = que.type;
                        url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + type_data;
                        check = cache.check(url);

                        time = Date.now();
                        _context.prev = 5;
                        _context.t0 = type_data;
                        _context.next = _context.t0 === "chain" ? 9 : _context.t0 === "album" ? 22 : _context.t0 === "artist" ? 27 : _context.t0 === "track" ? 32 : _context.t0 === "album_plus_artist" ? 37 : _context.t0 === "album_or_artist" ? 40 : _context.t0 === "album_plus_track" ? 45 : _context.t0 === "all" ? 52 : _context.t0 === "join" ? 59 : 62;
                        break;

                    case 9:
                        url = "https://api.spotify.com/v1/search?q=" + que.text + "&type=" + "album";
                        _context.next = 12;
                        return cache.check(url);

                    case 12:
                        check = _context.sent;

                        if (!(check == "empty")) {
                            _context.next = 20;
                            break;
                        }

                        _context.next = 16;
                        return new Promise(function (resolve, reject) {
                            needle.get(url, function (error, data) {
                                cache.addCache(url, data, time);
                                if (!error) resolve(data);else reject(error);
                            });
                        });

                    case 16:
                        result = _context.sent;

                        response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                        _context.next = 21;
                        break;

                    case 20:
                        response.end(JSON.stringify([Date.now() - time, check.body.albums]));

                    case 21:
                        return _context.abrupt('break', 62);

                    case 22:
                        _context.next = 24;
                        return promise(que.text, type_data);

                    case 24:
                        result = _context.sent;

                        response.end(JSON.stringify([Date.now() - time, result.body.albums]));
                        return _context.abrupt('break', 62);

                    case 27:
                        _context.next = 29;
                        return promise(que.text, type_data);

                    case 29:
                        result = _context.sent;

                        response.end(JSON.stringify([Date.now() - time, result.body.artists]));
                        return _context.abrupt('break', 62);

                    case 32:
                        _context.next = 34;
                        return promise(que.text, type_data);

                    case 34:
                        result = _context.sent;

                        response.end(JSON.stringify([Date.now() - time, result.body.tracks]));
                        return _context.abrupt('break', 62);

                    case 37:
                        _context.next = 39;
                        return bluebird.all([promise(que.text, "album"), promise(que.text, "artist")]).spread(function (album, artist) {
                            var alb = album.body.albums;
                            var art = artist.body.artists;
                            response.end(JSON.stringify([Date.now() - time, alb, art]));
                        });

                    case 39:
                        return _context.abrupt('break', 62);

                    case 40:
                        _context.next = 42;
                        return bluebird.any([promise(que.text, "album"), promise(que.text, "artist")]);

                    case 42:
                        result = _context.sent;


                        if (result.body.albums) response.end(JSON.stringify([Date.now() - time, result.body.albums]));else if (result.body.artists) response.end(JSON.stringify([Date.now() - time, result.body.artists]));

                        return _context.abrupt('break', 62);

                    case 45:
                        _context.next = 47;
                        return bluebird.props({ album: promise(que.text, "album"), track: promise(que.text, "track") });

                    case 47:
                        result = _context.sent;
                        alb = result.album.body.albums;
                        tr = result.track.body.tracks;


                        response.end(JSON.stringify([Date.now() - time, alb, tr]));
                        return _context.abrupt('break', 62);

                    case 52:
                        _context.next = 54;
                        return bluebird.some([promise(que.text, "album"), promise(que.text, "artist"), promise(que.text, "track")], 2);

                    case 54:
                        result = _context.sent;


                        if (result[0].body.albums) fst = result[0].body.albums;else if (result[0].body.artists) fst = result[0].body.artists;else if (result[0].body.tracks) fst = result[0].body.tracks;

                        if (result[1].body.albums) sec = result[1].body.albums;else if (result[1].body.artists) sec = result[1].body.artists;else if (result[1].body.tracks) sec = result[1].body.tracks;

                        response.end(JSON.stringify([Date.now() - time, fst, sec]));
                        return _context.abrupt('break', 62);

                    case 59:
                        _context.next = 61;
                        return bluebird.join(promise(que.text, "album"), promise(que.text, "artist"), function (album, artist) {
                            var alb = album.body.albums;
                            var art = artist.body.artists;
                            response.end(JSON.stringify([Date.now() - time, alb, art]));
                        });

                    case 61:
                        return _context.abrupt('break', 62);

                    case 62:
                        _context.next = 67;
                        break;

                    case 64:
                        _context.prev = 64;
                        _context.t1 = _context['catch'](5);

                        response.end("Error: Catch Error: " + _context.t1);

                    case 67:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 64]]);
    }));

    return function search(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var http = require("http");
var fs = require('fs');
var url = require('url');
var query = require('querystring');
var needle = require('needle');
var bluebird = require('bluebird');
var cache = require('./cache');

var time;

function start(url_path, response) {
    fs.readFile("./index.html", function (er, data) {
        response.end(data);
    });
}

function promise(text, type) {
    var url = "https://api.spotify.com/v1/search?q=" + text + "&type=" + type;
    var array = cache.check(url);

    if (array == "empty") return new Promise(function (resolve, reject) {
        needle.get(url, function (error, data) {
            cache.addCache(url, data, time);
            if (!error) resolve(data);else reject(error);
        });
    });else return Promise.resolve(array);
}

exports.start = start;
exports.search = search;