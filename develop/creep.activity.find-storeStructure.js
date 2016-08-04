'use strict';

function findStorage(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      (structure.store.energy + structure.store.L) < structure.storeCapacity
  });
}

module.exports = (creep, results) => {
  var storeStructure = findStorage(creep);
  if (storeStructure) {
    creep.memory.storeStructure = storeStructure.id;
  }
  return results.FINISHED;
};
