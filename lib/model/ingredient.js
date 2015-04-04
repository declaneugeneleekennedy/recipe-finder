var u = require('./unit');
var m = require('moment');

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
    this.name   = name;
    this.amount = amount;
    this.unit   = unit;
    this.useBy  = m(useBy, 'DD/MM/YYYY');
}

module.exports = Ingredient;