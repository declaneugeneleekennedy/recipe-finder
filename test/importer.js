var q           = require('q');
var Importer    = require(__dirname + '/../lib/importer');

/**
 * Tests that the constructor does not throw when a compatible parser is given,
 * and does throw when an incompatible one is provided
 */
module.exports.testConstructor = function(test) {
    test.expect(2);

    var p1 = {getModel: function() { return q(); }};
    var p2 = {};

    test.doesNotThrow(function() {
        new Importer('/path/to/file', p1);
    });

    test.throws(function() {
        new Importer('/path/to/file', p2);
    });

    test.done();
};

/**
 * Tests that the importer will succeed when an accessible file is given, and
 * fail when the file can not be found
 */
module.exports.testImport = function(test) {
    test.expect(2);

    var f1 = __filename;
    var f2 = '/path/to/file';

    var p = { getModel: function() { return q(); } };

    var i1 = new Importer(f1, p);
    var i2 = new Importer(f2, p);

    var p1 = i1.import();

    p1.then(function() {
        test.ok(true, 'Callback should be run');
    });


    var p2 = i2.import();

    p2.then(function() {

    }, function(err) {
        test.ok(err, 'An error should be generated');
    });

    q.allSettled([p1, p2]).done(function() {
        test.done();
    });
};