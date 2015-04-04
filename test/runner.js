// Test runner
var reporter = require('nodeunit').reporters.default;

// Tests

var tests = [
    //'/model/fridge',
    '/model/ingredient',
    //'/model/recipe',
    '/model/unit'
];

tests.forEach(function(test) {
    reporter.run([ __dirname + test + '.js' ]);
});