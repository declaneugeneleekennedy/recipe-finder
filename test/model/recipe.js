var Recipe      = require(__dirname + '/../../lib/model/recipe');
var Ingredient  = require(__dirname + '/../../lib/model/ingredient');

module.exports.testConstructor = function(test) {
    test.expect(4);

    var r = new Recipe('cheese on toast', [{
        name:   'cheese',
        amount: 2,
        unit:   'slices'
    }, {
        name:   'bread',
        amount: 200,
        unit:   'grams'
    }]);

    test.equal(Object.keys(r.getIngredients()).length, 2, 'Recipe should contain 2 ingredients');

    test.ok(r.getIngredient('cheese'), 'Ingredient cheese should be in the recipe');
    test.ok(r.getIngredient('bread'), 'Ingredient bread should be in the recipe');

    test.ok(!r.getIngredient('ham'), 'Ingredient ham should not be in the recipe');

    test.done();
};