var unitEnum = require('./unit');

/**
 * Simple model for an arbitrary ingredient
 *
 * @param {string} name
 * @param {int} amount
 * @param {string} unit
 * @param {string} useBy
 * @returns {object}
 */

function Ingredient(name, amount, unit, useBy) {
    var checkUnit = function(u) {
        for(var i in unitEnum) {
            if(unitEnum[i] === u) {
                return true;
            }
        }

        return false;
    };

    this.name   = name;
    this.amount = amount;

    if(!checkUnit(unit)) {
        throw 'Unknown unit type in ingredient: ' + unit;
    }

    this.unit   = unit;
    this.useBy  = new Date(useBy);
}

module.exports = Ingredient;