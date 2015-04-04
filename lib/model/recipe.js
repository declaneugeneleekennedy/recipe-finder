
function Recipe(name, ingredients) {
    var $t = this;

    this.name           = name;
    this.ingredients    = [];

    if(ingredients) {
        ingredients.forEach(function(ingredient) {
            $t.addIngredient(ingredient);
        });
    }
};

Recipe.prototype.addIngredient = function(ingredient) {
    var $t = this;

    $t.ingredients.push(ingredient);
};

Recipe.prototype.getIngredients = function() {
    var $t = this;

    return $t.ingredients;
};

module.exports = Recipe;