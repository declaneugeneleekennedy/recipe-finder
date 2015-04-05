
var io              = require('stdio');
var RecipeFinder    = require('./lib/recipe-finder');

console.log('=============');
console.log('Recipe Finder');
console.log('=============');

var options = io.getopt({
    fridge: {
        description:    'A CSV file containing the current items in the fridge',
        mandatory:      true,
        args:           1
    },
    recipes: {
        description:    'A JSON file containing a collection of recipes',
        mandatory:      true,
        args:           1
    }
});

var rf = new RecipeFinder(options.fridge, options.recipes);

rf.import().spread(function() {
    console.log(rf.find());
    process.exit(0);
}, function(err) {
    console.error(err);
    process.exit(1);
});