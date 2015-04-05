var q               = require('q');
var _               = require('underscore');
var Importer        = require('./importer');
var fridgeParser    = require('./parser/fridge');
var recipeParser    = require('./parser/recipe');

/**
 * Imports the contents of two data files representing the contents of a fridge
 * and a list of known recipes, then attempts to suggest a recipe based on the
 * available ingredients.
 *
 * @param {string} fridgePath
 * @param {string} recipePath
 * @returns {RecipeFinder}
 */
function RecipeFinder(fridgePath, recipePath) {
    var $t = this;

    $t.fridgeImporter = new Importer(fridgePath, fridgeParser);
    $t.recipeImporter = new Importer(recipePath, recipeParser);
};

/**
 * Imports the data files
 *
 * @returns {unresolved}
 */
RecipeFinder.prototype.import = function() {
    var $t = this;

    var p1 = $t.fridgeImporter.import();
    p1.then(function(fridge) {
        $t.fridge = fridge;
    }, function(err) {
        throw err;
    });

    var p2 = $t.recipeImporter.import();
    p2.then(function(recipeCollection) {
        $t.recipeCollection = recipeCollection;
    }, function(err) {
        throw err;
    });

    return q.all([p1, p2]);
};

/**
 * Goes through the data imported previously and returns a recipe, or 'Order
 * Takeout' if no valid recipe is found
 *
 * @returns {string}
 */
RecipeFinder.prototype.find = function() {
    var $t = this;

    var possible = _.filter($t.recipeCollection.getRecipes(), function(recipe) {
        return _.every(recipe.getIngredients(), function(ingredient) {
            return $t.fridge.check(ingredient.name, ingredient.amount, ingredient.unit);
        });
    });

    if(possible.length === 0) {
        return 'Order Takeout';
    }

    var chosen = _.min(possible, function(recipe) {
        var inFridge = _.filter($t.fridge.getAll(), function(ingredient) {
            return recipe.getIngredient(ingredient.name);
        });

        return _.min(inFridge, function(ingredient) {
            return ingredient.useBy.format('YYYYMMDD');
        }).useBy.format('YYYYMMDD');
    });

    return chosen.name;
};

module.exports = RecipeFinder;