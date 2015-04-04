var Fridge      = require(__dirname + '/../../lib/model/fridge');
var Ingredient  = require(__dirname + '/../../lib/model/ingredient');

module.exports.testConstructor = function(test) {
    test.expect(1);

    test.doesNotThrow(function() {
        new Fridge([new Ingredient('cheese', 10, 'slices', '12/06/2015')]);
    });

    test.done();
};

module.exports.testAdderAndGetter = function(test) {
    test.expect(2);

    var f = new Fridge();

    var c = new Ingredient('cheese', 10, 'slices', '12/06/2015');

    f.add(c);

    test.equal(f.get('cheese'), c, 'Ingredient.get(cheese) should contain the cheese incredient');
    test.throws(function() {
        f.add(c);
    },
    'Duplicate item added to Fridge',
    'Fridge should not allow duplicate items');

    test.done();
};

module.exports.testChecker = function(test) {
    test.expect(4);

    var future = new Date();
    future.setDate(future.getDate() + 1);

    var past = new Date();
    past.setDate(past.getDate() - 1);

    var format = function(date) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    var f = new Fridge([
        new Ingredient('cheese', 10, 'slices', format(future)),
        new Ingredient('ham', 200, 'grams', format(future)),
        new Ingredient('broccoli', 500, 'grams', format(past))
    ]);

    test.ok(f.check('cheese', 8, 'slices'), 'Item cheese should be usable');
    test.equal(f.check('ham', 300, 'grams'), false, 'Item ham should not be usable (not enough)');
    test.equal(f.check('ham', 100, 'ounces'), false, 'Item ham should not be usable (unknown unit)');
    test.equal(f.check('broccoli', 100, 'grams'), false, 'Item broccoli should not be usable (past use-by)');

    test.done();
};