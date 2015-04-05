
var fs              = require('fs');
var RecipeFinder    = require(__dirname + '/../lib/recipe-finder');
var m               = require('moment');

var _readFile;
var future = m();
future.set('date', future.get('date') + 7);

var past = m();
past.set('date', past.get('date') - 7);

/**
 * Creates a stub for fs.readFile which allows it to return the value given for
 * the path argument as a string
 */
module.exports.setUp = function(callback) {
    _readFile = fs.readFile;

    fs.readFile = function(string, cb) {
        cb(null, string);
    };
    callback();
};

/**
 * Reinstates the original fs.readFile method
 */
module.exports.tearDown = function(callback) {
    fs.readFile = _readFile;
    callback();
};

/**
 * Tests that a single valid recipe is found from the data provided
 */
module.exports.testOneRecipeFound = function(test) {
    test.expect(1);
    var csvString = 'cheese,10,slices,' + future.format('DD/MM/YYYY') + '\n' +
                    'bread,10,slices,' + future.format('DD/MM/YYYY') + '\n';

    var jsonString = JSON.stringify([{
        name: 'cheese on toast',
        ingredients: [
            {item: 'cheese', amount: 2, unit: 'slices'},
            {item: 'bread', amount: 2, unit: 'slices'}
        ]
    }]);

    var rf = new RecipeFinder(csvString, jsonString);

    var p = rf.import();

    p.then(function() {
        test.equal(rf.find(), 'cheese on toast', 'RecipeFinder should find cheese on toast');
    });

    p.done(function() {
        test.done();
    });
};

/**
 * Tests that no valid recipes are found within the data provided, because the
 * only recipe requires ingredients past their use-by
 */
module.exports.testNoneFound = function(test) {
    test.expect(1);
    var csvString = 'cheese,10,slices,' + future.format('DD/MM/YYYY') + '\n' +
                    'bread,10,slices,' + future.format('DD/MM/YYYY') + '\n' +
                    'bacon,5,rashers,' + future.format('DD/MM/YYYY') + '\n' +
                    'egg,12,of,' + past.format('DD/MM/YYYY') + '\n';

    var jsonString = JSON.stringify([{
        name: 'bacon and eggs',
        ingredients: [
            {item: 'bacon', amount: 2, unit: 'rashers'},
            {item: 'egg', amount: 2, unit: 'of'}
        ]
    }]);

    var rf = new RecipeFinder(csvString, jsonString);

    var p = rf.import();

    p.then(function() {
        test.equal(rf.find(), 'Order Takeout', 'RecipeFinder should find no possible recipes');
    });

    p.done(function() {
        test.done();
    });
};

/**
 * Tests that, upon finding multiple valid recipes, the recipe suggested will be
 * the one which requires an ingredient that is expiring sooner than any others
 */
module.exports.testMultipleFound = function(test) {
    test.expect(1);

    var eggDate = m();
    eggDate.set('date', eggDate.get('date') + 1);

    var csvString = 'cheese,10,slices,' + future.format('DD/MM/YYYY') + '\n' +
                    'bread,10,slices,' + future.format('DD/MM/YYYY') + '\n' +
                    'bacon,5,rashers,' + future.format('DD/MM/YYYY') + '\n' +
                    'egg,12,of,' + eggDate.format('DD/MM/YYYY') + '\n';

    var jsonString = JSON.stringify([{
        name: 'bacon and eggs',
        ingredients: [
            {item: 'bacon', amount: 2, unit: 'rashers'},
            {item: 'egg', amount: 2, unit: 'of'}
        ]
    }, {
        name: 'cheese on toast',
        ingredients: [
            {item: 'cheese', amount: 2, unit: 'slices'},
            {item: 'bread', amount: 2, unit: 'slices'}
        ]
    }]);

    var rf = new RecipeFinder(csvString, jsonString);

    var p = rf.import();

    p.then(function() {
        test.equal(rf.find(), 'bacon and eggs', 'RecipeFinder should suggest bacon and eggs');
    });

    p.done(function() {
        test.done();
    });
};