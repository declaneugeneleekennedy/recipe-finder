var q   = require('q');
var fs  = require('fs');

/**
 * Strategy wrapper for importing data from disk
 *
 * @param {string} path
 * @param {object} parser
 * @returns {Importer}
 */
function Importer(path, parser) {
    var $t = this;

    $t.path = path;
    $t.setParser(parser);
}

/**
 * Set a parser strategy. If the parser does not implement the getModel method,
 * an exception will be thrown.
 *
 * @param {object} parser
 * @returns {undefined}
 */
Importer.prototype.setParser = function(parser) {
    var $t = this;

    if(!parser.getModel || typeof parser.getModel != 'function') {
        throw 'Incompatible parser provided';
    }

    $t.parser = parser;
};

/**
 * Get the current parser
 *
 * @returns {object}
 */
Importer.prototype.getParser = function() {
    var $t = this;

    return $t.parser;
};

/**
 * Read the contents of the target file, then use the parser to convert it into
 * a model.
 *
 * @returns {unresolved}
 */
Importer.prototype.import = function() {
    var $t = this;

    var readFile = q.denodeify(fs.readFile);

    return readFile($t.path).then(function(contents) {
        return $t.getParser().getModel(contents);
    }, function(err) {
        throw err;
    });
};

module.exports = Importer;