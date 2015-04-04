var u = require('./unit');

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
    this.useBy  = new Date(useBy);
}

module.exports = Ingredient;