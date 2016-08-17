'use strict';

module.exports = (next, needEnergy, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return needEnergy;
  }
  if (opts.ticksToDowngrade && creep.room.controller.ticksToDowngrade >= opts.ticksToDowngrade) {
    return next;
  }
  if (creep.moveToOr('upgradeController', creep.room.controller)) {
    return next;
  }
};
