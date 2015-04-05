var Recipe = require('./recipe');

/**
 * A collection for recipes, with implicit instance creation on add
 *
 * @param {array} recipes
 * @returns {RecipeCollection}
 */
function RecipeCollection(recipes) {
    var $t = this;

    $t.recipes = {};

    if(recipes) {
        recipes.forEach(function(recipe) {
            $t.add(recipe);
        });
    }
};

/**
 * Add a recipe to the collection
 *
 * @param {object} recipe
 * @returns {undefined}
 */
RecipeCollection.prototype.add = function(recipe) {
    var $t = this;

    $t.recipes[recipe.name] = new Recipe(recipe.name, recipe.ingredients);
};

/**
 * Get a recipe from the collection
 *
 * @param {string} name
 * @returns {Recipe}
 */
RecipeCollection.prototype.get = function(name) {
    var $t = this;

    return $t.recipes[name];
};

/**
 * Get all recipes in the collection
 *
 * @returns {array}
 */
RecipeCollection.prototype.getRecipes = function() {
    var $t = this;

    return $t.recipes;
};

module.exports = RecipeCollection;
