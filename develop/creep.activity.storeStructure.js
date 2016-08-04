'use strict';

module.exports = (creep, results) => {
  var storeStructure = Game.getObjectById(creep.memory.storeStructure);
  if (creep.transfer(storeStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if ((structure.store.energy + structure.store.L) === storeStructure.storeCapacity) {
      delete creep.memory.storeStructure;
      return results.FINISHED;
    }
    creep.moveTo(storeStructure);
    return results.NEXTTICK;
  }
  delete creep.memory.storeStructure;
  return results.FINISHED | results.NEXTTICK;
};
