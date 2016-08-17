'use strict';

module.exports = (next, empty, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return empty;
  }
  if (opts.ticksToDowngrade && creep.room.controller.ticksToDowngrade >= opts.ticksToDowngrade) {
    return next;
  }
  if (creep.moveToAnd('upgradeController', creep.room.controller)) {
    return next;
  }
};
