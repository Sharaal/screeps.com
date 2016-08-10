'use strict';

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === 0) {
    return harvest;
  }
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  } else {
    return next;
  }
};
