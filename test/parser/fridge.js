var parser = require(__dirname + '/../../lib/parser/fridge');

module.exports.testWellFormed = function(test) {
    test.expect(2);

    var csvString = 'cheese,10,slices,20/12/2015\n' +
                    'ham,200,grams,10/10/2015\n';

    parser.getModel(csvString).then(function(model) {
        test.ok(model.get('cheese'), 'Fridge should contain cheese');
        test.ok(model.get('ham'), 'Fridge should contain ham');

        test.done();
    });
};