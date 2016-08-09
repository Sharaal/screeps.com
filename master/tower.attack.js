'use strict';

module.exports = tower => {
  var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (target) {
    tower.attack(target);
    return true;
  }
};
