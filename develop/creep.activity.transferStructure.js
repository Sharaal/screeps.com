'use strict';

function validate(structure) {
  return structure.energy < structure.energyCapacity;
}

function findTransferExtensionOrSpawn(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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

function findTransferTower(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_TOWER
      &&
      structure.energy < structure.energyCapacity
  });
}

function find(creep) {
  return findTransferExtensionOrSpawn(creep) || findTransferTower(creep);
}

module.exports = (next, harvest) => creep => {
  if (creep.isEmpty()) {
    return harvest;
  }
  var structure = creep.getMemoryObject('transferStructure', validate, find);
  if (!structure) {
    return next;
  }
  if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(structure);
  }
};
