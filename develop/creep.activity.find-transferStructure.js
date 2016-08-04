'use strict';

function findExtensionOrSpawn(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      (
        structure.structureType == STRUCTURE_EXTENSION
        ||
        structure.structureType == STRUCTURE_SPAWN
      )
      &&
      structure.energy < structure.energyCapacity
  });
}

function findTower(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_TOWER
      &&
      structure.energy < structure.energyCapacity
  });
}

function findStorage(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      (structure.store.energy + structure.store.L) < structure.storeCapacity
  });
}

module.exports = (creep, results) => {
  var transferStructure = findExtensionOrSpawn(creep) || findTower(creep);
  if (transferStructure) {
    creep.memory.transferStructure = transferStructure.id;
  }
  return results.FINISHED;
};
