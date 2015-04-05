var Recipe      = require(__dirname + '/../../lib/model/recipe');
var Ingredient  = require(__dirname + '/../../lib/model/ingredient');

/**
 * Tests that ingredients provided to the constructor are correctly set and can
 * be returned using getIngredient()
 */
module.exports.testConstructor = function(test) {
    test.expect(4);

    var r = new Recipe('cheese on toast', [{
        item:   'cheese',
        amount: 2,
        unit:   'slices'
    }, {
        item:   'bread',
        amount: 200,
        unit:   'grams'
    }]);

    test.equal(Object.keys(r.getIngredients()).length, 2, 'Recipe should contain 2 ingredients');

    test.ok(r.getIngredient('cheese'), 'Ingredient cheese should be in the recipe');
    test.ok(r.getIngredient('bread'), 'Ingredient bread should be in the recipe');

    test.ok(!r.getIngredient('ham'), 'Ingredient ham should not be in the recipe');

    test.done();
};