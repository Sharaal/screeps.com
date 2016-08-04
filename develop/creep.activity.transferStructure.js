'use strict';

module.exports = (creep, results) => {
  var transferStructure = Game.getObjectById(creep.memory.transferStructure);
  if (creep.transfer(transferStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if (transferStructure.energy === transferStructure.energyCapacity) {
      delete creep.memory.transferStructure;
      return results.FINISHED;
    }
    creep.moveTo(transferStructure);
    return results.NEXTTICK;
  }
  delete creep.memory.transferStructure;
  return results.FINISHED | results.NEXTTICK;
};
