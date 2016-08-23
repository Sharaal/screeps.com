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

module.exports = (full, next) => creep => {
  if (creep.isFull()) {
    return full;
  }
  const energyStorage = creep.getMemoryObject('withdrawEnergyStorage', find, { validate: validate });
  if (!energyStorage) {
    return next;
  }
  creep.moveToAnd('withdraw', [energyStorage, RESOURCE_ENERGY]);
};
