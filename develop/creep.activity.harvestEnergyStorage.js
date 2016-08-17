'use strict';

function validate(energyStorage) {
  return energyStorage.store.energy > 0;
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_STORAGE
      &&
      structure.store.energy > 0
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
