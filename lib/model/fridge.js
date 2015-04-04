var u           = require('./unit');
var m           = require('moment');
var Ingredient  = require('./ingredient');

function Fridge(items) {
    var $t = this;

    $t.items = {};

    if(items) {
        items.forEach(function(item) {
            $t.add(item);
        });
    }
};

Fridge.prototype.add = function(item) {
    $t = this;

    if(!u.check(item.unit)) {
        u.add(item.unit);
    }

    if($t.items[item.name]) {
        throw 'Duplicate item added to Fridge';
    }

    $t.items[item.name] =
            new Ingredient(item.name, item.amount, item.unit, item.useBy);
};

Fridge.prototype.get = function(name) {
    var $t = this;

    return $t.items[name];
};

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