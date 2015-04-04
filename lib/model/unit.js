
var units = [];

exports.add = function(name) {
    if(units.indexOf(name) == -1) {
        units.push(name);
    }
};

exports.checkUnit = function(name) {
    return !(units.indexOf(name) == -1);
};