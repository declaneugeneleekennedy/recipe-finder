var u           = require('./unit');
var m           = require('moment');
var Ingredient  = require('./ingredient');

/**
 * Fridge model, basically a slightly smart collection
 *
 * @param {array} items
 * @returns {Fridge}
 */
function Fridge(items) {
    var $t = this;

    $t.items = {};

    if(items) {
        items.forEach(function(item) {
            $t.add(item);
        });
    }
};

/**
 * Add an item to the fridge
 *
 * @param {object} item
 * @returns {undefined}
 */
Fridge.prototype.add = function(item) {
    var $t = this;

    if(!u.check(item.unit)) {
        u.add(item.unit);
    }

    if($t.items[item.name]) {
        throw 'Duplicate item added to Fridge';
    }

    $t.items[item.name] =
            new Ingredient(item.name, item.amount, item.unit, item.useBy);
};

/**
 * Get an item from the fridge
 *
 * @param {string} name
 * @returns {Ingredient}
 */
Fridge.prototype.get = function(name) {
    var $t = this;

    return $t.items[name];
};

/**
 * Get the contents of the fridge
 *
 * @returns {object}
 */
Fridge.prototype.getAll = function() {
    var $t = this;

    return $t.items;
};

/**
 * Check for a valid ingredient in the fridge. Valid means:
 *
 * - exists
 * - has a sufficient amount
 * - is not on or past use-by date
 *
 * @param {string} name
 * @param {number} amount
 * @param {string} unit
 * @returns {Boolean}
 */
Fridge.prototype.check = function(name, amount, unit) {
    var ingredient = this.get(name);

    if(!ingredient) {
        return false;
    }

    if(ingredient.amount < amount || ingredient.unit !== unit) {
        return false;
    }

    if(ingredient.useBy < m()) {
        return false;
    }

    return true;
};

module.exports = Fridge;