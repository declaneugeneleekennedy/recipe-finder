
var RecipeCollection = require(__dirname + '/../../lib/model/recipe-collection');

module.exports.testConstructor = function(test) {
    test.expect(2);

    var rc = new RecipeCollection([{
        name: 'cheese on toast',
        ingredients: [
            {name: 'cheese', amount: 2, unit: 'slices'},
            {name: 'bread', amount: 2, unit: 'slices'}
        ]
    }, {
       name: 'vegemite sandwich',
       ingredients: [
           {name: 'vegemite', amount: 2, unit: 'grams'},
           {name: 'bread', amount: 2, unit: 'slices'}
       ]
    }]);

    test.ok(rc.get('cheese on toast'), 'RecipeCollection should contain cheese on toast');
    test.ok(rc.get('vegemite sandwich'), 'RecipeCollection should contain vegemite sandwich');

    test.done();
};
