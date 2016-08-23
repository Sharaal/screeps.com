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

module.exports = (next, empty) => creep => {
  if (creep.isEmpty()) {
    creep.removeMemoryObject('transferStructure');
    return empty;
  }
  const structure = creep.getMemoryObject('transferStructure', find, { validate: validate });
  if (!structure) {
    return next;
  }
  creep.moveToAnd('transfer', [structure, RESOURCE_ENERGY]);
};
