var u = require('./unit');

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

    $t.items[item.name] = item;
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

    if(ingredient.useBy < new Date) {
        return false;
    }

    return true;
};

module.exports = Fridge;