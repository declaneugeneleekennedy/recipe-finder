
var RecipeCollection = require(__dirname + '/../../lib/model/recipe-collection');

/**
 * Tests that the constructor sets provided recipes and that get() returns them
 * by name (as a side-effect)
 */
module.exports.testConstructor = function(test) {
    test.expect(2);

    var rc = new RecipeCollection([{
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

    test.ok(rc.get('cheese on toast'), 'RecipeCollection should contain cheese on toast');
    test.ok(rc.get('vegemite sandwich'), 'RecipeCollection should contain vegemite sandwich');

    test.done();
};
