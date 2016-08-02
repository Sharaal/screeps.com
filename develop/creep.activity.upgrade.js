'use strict';

module.exports = creep => {
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
    return;
  }
  if (creep.carry.energy === 0) {
    return true;
  }
};
