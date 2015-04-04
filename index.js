
var q           = require('q');
var fs          = require('fs');
var io          = require('stdio');
var fridge      = require('./lib/model/fridge');
var ingredient  = require('./lib/model/ingredient');
var recipe      = require('./lib/model/recipe');

console.log('=============');
console.log('Recipe Finder');
console.log('=============');

var options = io.getopt({
    fridge: {
        description:    'A CSV file containing the current items in the fridge',
        mandatory:      true
    },
    recipes: {
        description:    'A JSON file containing a collection of recipes',
        mandatory:      true
    }
});