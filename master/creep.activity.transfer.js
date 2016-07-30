'use strict';

var memoryRandomSelect = require('./util.memory-random-select');

module.exports = creep => {
  var transferTargets = creep.room.find(FIND_STRUCTURES, {
    filter: structure =>
    (
      structure.structureType == STRUCTURE_EXTENSION ||
      structure.structureType == STRUCTURE_SPAWN ||
      structure.structureType == STRUCTURE_TOWER
    )
    && structure.energy < structure.energyCapacity
  });

  var transferTarget = memoryRandomSelect(creep, 'transferTarget', transferTargets);
  if (!transferTarget) {
    return true;
  }

  if (creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferTarget);
  } else {
    if (creep.carry.energy === 0) {
      return true;
    }
  }
};
