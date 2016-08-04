'use strict';

module.exports = (creep, results) => {
  var energyStore = Game.getObjectById(creep.memory.energyStore);
  if (!energyStore) {
    delete creep.memory.energyStore;
    return results.FINISHED | results.NEXTTICK;
  }
  if (creep.withdraw(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    if (energyStore.store.energy === 0) {
      delete creep.memory.energyStore;
      return results.FINISHED;
    }
    creep.moveTo(energyStore);
    return results.NEXTTICK;
  }
  delete creep.memory.energyStore;
  return results.FINISHED | results.NEXTTICK;
};
