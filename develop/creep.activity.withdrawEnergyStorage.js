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

module.exports = (next, empty) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var energyStorage = creep.getMemoryObject('withdrawEnergyStorage', validate, find);
  if (!energyStorage) {
    return empty;
  }
  creep.moveToAnd('withdraw', [energyStorage, RESOURCE_ENERGY]);
};
