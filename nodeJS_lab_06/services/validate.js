function library(data) {
    if ((data.title == "" || data.capacity == "") ||
        (data.title == null || data.capacity == null)) return false;
    else return true;
}

function author(data) {
    if ((data.name == "" || data.country == "" || data.pseudonym == "") ||
        (data.name == null || data.country == null || data.pseudonym == null)) return false;
    else return true;
}

function book(data) {
    if ((data.title == "" || data.releaseDate == "" || data.genre == "") ||
        (data.title == null || data.releaseDate == null || data.genre == null)) return false;
    else return true;
}

function registration(data) {
    if ((data.email == "" || data.password == "" || data.firstname == "" || data.lastname == "") ||
        (data.email == null || data.password == null || data.firstname == null || data.lastname == null)) return false;
    else return true;
}

exports.library = library;
exports.author = author;
exports.book = book;
exports.registration = registration;