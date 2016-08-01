'use strict';

var attack = require('./tower.attack');
var repair = require('./tower.repair');

module.exports = tower => {
  if (attack(tower)) {
    return;
  }
  if (tower.energy / tower.energyCapacity > 0.5) {
    repair(tower);
  }
};
