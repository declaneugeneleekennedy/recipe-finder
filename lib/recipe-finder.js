var q               = require('q');
var _               = require('underscore');
var Importer        = require('./importer');
var fridgeParser    = require('./parser/fridge');
var recipeParser    = require('./parser/recipe');

function RecipeFinder(fridgePath, recipePath) {
    var $t = this;

    $t.fridgeImporter = new Importer(fridgePath, fridgeParser);
    $t.recipeImporter = new Importer(recipePath, recipeParser);
};

RecipeFinder.prototype.import = function() {
    var $t = this;

    var p1 = $t.fridgeImporter.import();
    p1.then(function(fridge) {
        $t.fridge = fridge;
    });

    var p2 = $t.recipeImporter.import();
    p2.then(function(recipeCollection) {
        $t.recipeCollection = recipeCollection;
    });

    return q.allSettled([p1, p2]);
};

RecipeFinder.prototype.find = function() {
    var $t = this;

    var possible = _.find($t.recipeCollection.getRecipes(), function(recipe) {
        return _.every(recipe.getIngredients(), function(ingredient) {
            return $t.fridge.check(ingredient.name, ingredient.amount, ingredient.unit);
        });
    });

    if(possible.length === 0) {
        console.log('Order Takeout');
        return;
    }

    var chosen = _.min(possible, function(recipe) {
        return _.min(recipe.getIngredients(), function(ingredient) {
            return ingredient.useBy.format('YYYYMMDD');
        });
    });

    console.log(chosen.name);
};

module.exports = RecipeFinder;