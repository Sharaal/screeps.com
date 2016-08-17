'use strict';

function validate(structure) {
  return !structure.isFull();
}

function findTransferExtensionOrSpawn(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      (
        structure.structureType === STRUCTURE_EXTENSION
        ||
        structure.structureType === STRUCTURE_SPAWN
      )
      &&
      validate(structure)
  });
}

function findTransferTower(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_TOWER
      &&
      validate(structure)
  });
}

function find(creep) {
  return findTransferExtensionOrSpawn(creep) || findTransferTower(creep);
}

module.exports = (next, needEnergy) => creep => {
  if (creep.isEmpty()) {
    return needEnergy;
  }
  var structure = creep.getMemoryObject('transferStructure', validate, find);
  if (!structure) {
    return next;
  }
  creep.moveToOr('transfer', [structure, RESOURCE_ENERGY]);
};
