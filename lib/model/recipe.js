var Ingredient = require('./ingredient');

/**
 * A model representing a recipe, with a name and a collection of ingredients
 *
 * @param {string} name
 * @param {array} ingredients
 * @returns {Recipe}
 */
function Recipe(name, ingredients) {
    var $t = this;

    this.name           = name;
    this.ingredients    = {};

    if(ingredients) {
        ingredients.forEach(function(ingredient) {
            $t.addIngredient(ingredient);
        });
    }
};

/**
 * Add an ingredient to the recipe. This remaps the property item to name.
 *
 * @param {object} ingredient
 * @returns {undefined}
 */
Recipe.prototype.addIngredient = function(ingredient) {
    var $t = this;

    $t.ingredients[ingredient.item] =
            new Ingredient(ingredient.item, ingredient.amount, ingredient.unit);
};

/**
 * Get an ingredient by name from the recipe
 *
 * @param {string} name
 * @returns {Ingredient}
 */
Recipe.prototype.getIngredient = function(name) {
    var $t = this;

    return $t.ingredients[name];
};

/**
 * Get all ingredients from the recipe
 *
 * @returns {array}
 */
Recipe.prototype.getIngredients = function() {
    var $t = this;

    return $t.ingredients;
};

module.exports = Recipe;