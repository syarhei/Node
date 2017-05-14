"use strict";

var array = new Array();

function check(url) {
    for (var i = 0; i < array.length; i++) {
        if (Date.now() - array[i].time > 60000) array.splice(array[i], 1);
        if (url == array[i].url) {
            array[i].time = Date.now();
            return array[i].result;
        }
    }
    return "empty";
}

function addCache(url, result, time) {
    array.push({ "url": url, "result": result, "time": time });
}

exports.check = check;
exports.addCache = addCache;