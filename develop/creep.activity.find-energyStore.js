'use strict';

function findStorage(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      structure.store.energy > 0
  });
}

module.exports = (creep, results) => {
  var energyStore = findStorage(creep);
  if (energyStore) {
    creep.memory.energyStore = energyStore.id;
  }
  return results.FINISHED;
};
