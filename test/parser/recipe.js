var parser = require(__dirname + '/../../lib/parser/recipe');

module.exports.testWellFormed = function(test) {
    test.expect(2);

    var json = JSON.stringify([{
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

    parser.getModel(json).then(function(model) {
        test.ok(model.get('cheese on toast'), 'RecipeCollection should contain cheese on toast');
        test.ok(model.get('vegemite sandwich'), 'RecipeCollection should contain vegemite sandwich');
        
        test.done();
    });
};