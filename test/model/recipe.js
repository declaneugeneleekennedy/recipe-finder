var Recipe      = require(__dirname + '/../../lib/model/recipe');
var Ingredient  = require(__dirname + '/../../lib/model/ingredient');

module.exports.testConstructor = function(test) {
    test.expect(3);

    var c = new Ingredient('cheese', 2, 'slices');
    var b = new Ingredient('bread', 2, 'slices');
    var h = new Ingredient('ham', 200, 'grams');

    var r = new Recipe('cheese on toast', [ c, b ]);

    test.ok((r.getIngredients().indexOf(c) != -1), 'Ingredient cheese should be in the recipe');
    test.ok((r.getIngredients().indexOf(b) != -1), 'Ingredient bread should be in the recipe');

    test.equal(r.getIngredients().indexOf(h), -1, 'Ingredient ham should not be in the recipe');

    test.done();
};