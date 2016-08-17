'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports = (next, harvest, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return harvest;
  }
  if (opts.ticksToDowngrade && creep.room.controller.ticksToDowngrade >= opts.ticksToDowngrade) {
    return next;
  }
  var source = harvestSourcePositions.getSource(creep.pos);
  if (source) {
    creep.moveAwayFrom(source);
  } else {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    } else {
      return next;
    }
  }
};
