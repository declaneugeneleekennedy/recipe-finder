var Ingredient  = require(__dirname + '/../../lib/model/ingredient');
var unit        = require(__dirname + '/../../lib/model/unit');
var m           = require('moment');

/**
 * Tests that the constructor does not throw an exception when valid input is
 * given, and does throw exceptions when invalid input is given
 */
module.exports = {
    testConstructor: function(test) {
        test.expect(8);

        var good = new Ingredient('ham', 100, 'grams', '12/06/2015');

        test.equal(good.name, 'ham', 'name should be ham');
        test.equal(good.amount, 100, 'amount should be 100');
        test.equal(good.unit, 'grams', 'unit should be grams');

        test.equal(good.useBy.format('YYYYMMDD'),
            m('12/06/2015', 'DD/MM/YYYY').format('YYYYMMDD'),
            'useBy should be 12/06/2015');

        test.throws(function() {
            new Ingredient(null, 100, 'grams', '12/06/2015');
        },
        'Ingredient.name is required',
        'Ingredient.name should be required');

        test.throws(function() {
            new Ingredient('ham', null, 'grams', '12/06/2015');
        },
        'Ingredient.amount is required',
        'Ingredient.amount should be required');

        test.throws(function() {
            new Ingredient('ham', 100, null, '12/06/2015');
        },
        'Ingredient.unit is required',
        'Ingredient.unit should be required');

        test.doesNotThrow(function() {
            new Ingredient('ham', 100, 'grams');
        },
        'Ingredient.useBy should not be required');

        test.done();
    }
};
