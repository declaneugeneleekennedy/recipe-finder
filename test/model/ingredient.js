var Ingredient  = require(__dirname + '/../../lib/model/ingredient');
var unit        = require(__dirname + '/../../lib/model/unit');

module.exports = {
    testConstructor: function(test) {
        test.expect(5);

        var good = new Ingredient('ham', 100, unit.GRAMS, '12/06/2015');

        test.equal(good.name, 'ham', 'name should be ham');
        test.equal(good.amount, 100, 'amount should be 100');
        test.equal(good.unit, unit.GRAMS, 'unit should be grams');
        test.equal(good.useBy.getTime(), new Date('12/06/2015').getTime(), 'useBy should be 12/06/2015');

        test.throws(function() {
            new Ingredient('ham', 100, 'ounces', '12/06/2015');
        },
        'Unknown unit type in ingredient: ounces',
        'ounces should not be allowed as a unit');

        test.done();
    }
};
