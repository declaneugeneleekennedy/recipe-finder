var q   = require('q');
var fs  = require('fs');

function Importer(path, parser) {
    var $t = this;

    $t.path = path;
    $t.setParser(parser);
}

Importer.prototype.setParser = function(parser) {
    var $t = this;

    if(!parser.getModel || typeof parser.getModel != 'function') {
        throw 'Incompatible parser provided';
    }

    $t.parser = parser;
};

Importer.prototype.getParser = function() {
    var $t = this;

    return $t.parser;
};

Importer.prototype.import = function() {
    var $t = this;

    var readFile = q.denodeify(fs.readFile);

    var d = q.defer();

    readFile($t.path).then(function(contents) {
        var model = $t.getParser().getModel(contents);
        d.resolve(model);
    }, function(err) {
        d.reject(err);
    });

    return d.promise;
};

module.exports = Importer;