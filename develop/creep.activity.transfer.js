'use strict';

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
  if (!transferTargets.length) {
    return true;
  }

  if (creep.memory.transferTarget && !transferTargets[creep.memory.transferTarget]) {
    delete creep.memory.transferTarget;
  }
  if (!creep.memory.transferTarget) {
    creep.memory.transferTarget = _.sample(_.keys(transferTargets));
  }

  var transferTarget = transferTargets[creep.memory.transferTarget];

  if (creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferTarget);
  } else {
    if (creep.carry.energy === 0) {
      return true;
    }
  }
};
