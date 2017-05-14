function validate(id, data) {
    var valid = false;
    data.forEach(function(item,index) {
        if(parseInt(item.id) == parseInt(id)){
            valid = true;
        }
    });
    return valid;
}

function notNull(text) {
    return text == "";
}

function onlyDigit(text) {
    var regx = /^[0-9]+$/
    return regx.test(text);
}

exports.validate = validate;
exports.notNull = notNull;
exports.onlyDigit = onlyDigit;