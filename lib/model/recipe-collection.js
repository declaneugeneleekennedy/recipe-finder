var Recipe = require('./recipe');

function RecipeCollection(recipes) {
    var $t = this;

    $t.recipes = {};

    if(recipes) {
        recipes.forEach(function(recipe) {
            $t.add(recipe);
        });
    }
};

RecipeCollection.prototype.add = function(recipe) {
    var $t = this;

    $t.recipes[recipe.name] = new Recipe(recipe.name, recipe.ingredients);
};

module.exports = Recipe;
