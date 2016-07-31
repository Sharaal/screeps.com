'use strict';

module.exports = creep => {
  var transferTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
    (
      structure.structureType == STRUCTURE_EXTENSION ||
      structure.structureType == STRUCTURE_SPAWN ||
      structure.structureType == STRUCTURE_TOWER
    )
    && structure.energy < structure.energyCapacity
  });
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
