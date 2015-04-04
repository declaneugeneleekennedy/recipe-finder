var u = require(__dirname + '/../../lib/model/unit');

exports.testUnit = function(test) {
    test.expect(2);

    u.add('grams');

    test.ok(u.checkUnit('grams'), 'grams should be a valid unit');
    test.equal(u.checkUnit('ounces'), false, 'ounces should be an invalid unit');

    test.done();
};