
var q                   = require('q');
var RecipeCollection    = require('../model/recipe-collection');
var Ingredient          = require('../model/ingredient');

module.exports.getModel = function(contents) {
    var data = JSON.parse(contents);
    
    return q(new RecipeCollection(data));
};
