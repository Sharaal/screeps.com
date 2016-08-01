'use strict';

module.exports = creep => {
  creep.upgradeController(creep.room.controller);
  if (creep.carry.energy === 0) {
    return true;
  }
};
