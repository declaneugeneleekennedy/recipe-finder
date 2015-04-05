/**
 * Available unit types
 *
 * @type Array
 */

var units = [];

/**
 * Add a type of unit. Used by Fridge when adding items.
 *
 * @param {string} name
 * @returns {undefined}
 */
exports.add = function(name) {
    if(units.indexOf(name) == -1) {
        units.push(name);
    }
};

/**
 * Check for the existence of a unit. Used to validate ingredients from a Recipe
 * instance are given in a known unit type.
 *
 * @param {string} name
 * @returns {Boolean}
 */
exports.check = function(name) {
    return !(units.indexOf(name) == -1);
};