'use strict';

module.exports = (creep, results) => {
  var transferStructure = Game.getObjectById(creep.memory.transferStructure);
  if (creep.transfer(transferStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferStructure);
    return results.NEXTTICK;
  }
  return results.FINISHED | results.NEXTTICK;
};
