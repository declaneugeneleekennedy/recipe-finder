// Test runner
var reporter = require('nodeunit').reporters.default;

// Tests

var tests = [
    '/model/fridge',
    '/model/ingredient',
    '/model/recipe',
    '/model/unit',
    '/importer',
    '/parser/fridge'
];

tests.forEach(function(test, i) {
    tests[i] = __dirname + test + '.js';
});

reporter.run(tests);