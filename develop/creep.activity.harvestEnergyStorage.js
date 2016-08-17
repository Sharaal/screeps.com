'use strict';

function validate(energyStorage) {
  return !energyStorage.isEmpty();
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_STORAGE
      &&
      validate(structure)
  });
}

module.exports = (next, harvest) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var energyStorage = creep.getMemoryObject('harvestEnergyStorage', validate, find);
  if (!energyStorage) {
    return harvest;
  }
  creep.moveToOr('withdraw', [energyStorage, RESOURCE_ENERGY]);
};
