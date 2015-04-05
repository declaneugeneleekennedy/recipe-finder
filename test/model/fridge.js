var Fridge      = require(__dirname + '/../../lib/model/fridge');
var Ingredient  = require(__dirname + '/../../lib/model/ingredient');
var m           = require('moment');

/**
 * Tests that the constructor does not throw exceptions when given valid input
 */
module.exports.testConstructor = function(test) {
    test.expect(1);

    test.doesNotThrow(function() {
        new Fridge([{
                name: 'cheese',
                amount: 10,
                unit: 'slices',
                useBy: '12/06/2015'
            }]);
    });

    test.done();
};

/**
 * Tests that the add, get and getAll methods are operating as intended
 */
module.exports.testAdderAndGetter = function(test) {
    test.expect(6);

    var f = new Fridge();

    var o = {
        name: 'cheese',
        amount: 10,
        unit: 'slices',
        useBy: '12/06/2015'
    };

    f.add(o);

    test.equal(f.get('cheese').name, 'cheese', 'Fridge.get(cheese).name should be cheese');
    test.equal(f.get('cheese').amount, 10, 'Fridge.get(cheese).amount should be 10');
    test.equal(f.get('cheese').unit, 'slices', 'Fridge.get(cheese).unit should be slices');
    test.equal(f.get('cheese').useBy.format('DDMMYYYY'), '12062015', 'Fridge.get(cheese).useBy should be 12062015');

    test.equal(Object.keys(f.getAll()).length, 1, 'Fridge.getAll() should return 1 item');

    test.throws(function() {
        f.add(o);
    },
    'Duplicate item added to Fridge',
    'Fridge should not allow duplicate items');

    test.done();
};

/**
 * Tests that the check method for validating ingredients is operating correctly
 */
module.exports.testChecker = function(test) {
    test.expect(4);

    var future = m();
    future.set('date', future.get('date') + 1);

    var past = m();
    past.set('date', past.get('date') - 1);

    var f = new Fridge([{
        name: 'cheese',
        amount: 10,
        unit: 'slices',
        useBy: future.format('DD/MM/YYYY')
    }, {
        name: 'ham',
        amount: 200,
        unit: 'grams',
        useBy: future.format('DD/MM/YYYY')
    }, {
        name: 'broccoli',
        amount: 500,
        unit: 'grams',
        useBy: past.format('DD/MM/YYYY')
    }]);

    test.ok(f.check('cheese', 8, 'slices'), 'Item cheese should be usable');
    test.equal(f.check('ham', 300, 'grams'), false, 'Item ham should not be usable (not enough)');
    test.equal(f.check('ham', 100, 'ounces'), false, 'Item ham should not be usable (unknown unit)');
    test.equal(f.check('broccoli', 100, 'grams'), false, 'Item broccoli should not be usable (past use-by)');

    test.done();
};