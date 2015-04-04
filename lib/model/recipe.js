var Ingredient = require('./ingredient');

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

Recipe.prototype.addIngredient = function(ingredient) {
    var $t = this;

    $t.ingredients[ingredient.name] =
            new Ingredient(ingredient.name, ingredient.amount, ingredient.unit);
};

Recipe.prototype.getIngredient = function(name) {
    var $t = this;

    return $t.ingredients[name];
};

Recipe.prototype.getIngredients = function() {
    var $t = this;

    return $t.ingredients;
};

module.exports = Recipe;