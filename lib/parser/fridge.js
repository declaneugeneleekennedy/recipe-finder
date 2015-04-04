var csv         = require('fast-csv');
var q           = require('q');
var Fridge      = require('../model/fridge');
var Ingredient  = require('../model/ingredient');

module.exports.getModel = function(contents) {
    var f = new Fridge(),
        d = q.defer();

    csv.fromString(contents, {headers: ['name', 'amount', 'unit', 'useBy']})
            .on('data', function(data) {
                f.add(new Ingredient(
                    data.name, data.amount, data.unit, data.useBy));
            })
            .on('end', function() {
                d.resolve(f);
            });

    return d.promise;
};