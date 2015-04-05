var parser = require(__dirname + '/../../lib/parser/recipe');

/**
 * Tests that the parser correctly handles properly formatted JSON data
 */
module.exports.testWellFormed = function(test) {
    test.expect(2);

    var json = JSON.stringify([{
        name: 'cheese on toast',
        ingredients: [
            {item: 'cheese', amount: 2, unit: 'slices'},
            {item: 'bread', amount: 2, unit: 'slices'}
        ]
    }, {
       name: 'vegemite sandwich',
       ingredients: [
           {item: 'vegemite', amount: 2, unit: 'grams'},
           {item: 'bread', amount: 2, unit: 'slices'}
       ]
    }]);

    parser.getModel(json).then(function(model) {
        test.ok(model.get('cheese on toast'), 'RecipeCollection should contain cheese on toast');
        test.ok(model.get('vegemite sandwich'), 'RecipeCollection should contain vegemite sandwich');

        test.done();
    });
};