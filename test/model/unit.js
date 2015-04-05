var u = require(__dirname + '/../../lib/model/unit');

/**
 * Tests that the check() method on unit returns true on units which exist and
 * false on those which do not
 */
exports.testUnit = function(test) {
    test.expect(2);

    u.add('grams');

    test.ok(u.check('grams'), 'grams should be a valid unit');
    test.equal(u.check('ounces'), false, 'ounces should be an invalid unit');

    test.done();
};