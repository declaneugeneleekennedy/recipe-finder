// Test runner
var reporter = require('nodeunit').reporters.default;

// Tests

var tests = [
    '/model/fridge',
    '/model/ingredient',
    '/model/recipe',
    '/model/unit',
    '/model/recipe-collection',
    '/importer',
    '/parser/fridge',
    '/parser/recipe'
];

tests.forEach(function(test, i) {
    tests[i] = __dirname + '/test' + test + '.js';
});

reporter.run(tests);