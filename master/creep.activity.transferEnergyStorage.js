'use strict';

function validate(energyStorage) {
  return !energyStorage.isFull();
}

function getFind(range) {
  const opts = {
    filter: structure =>
      structure.structureType === STRUCTURE_STORAGE
      &&
      validate(structure)
  };
  if (range) {
    return creep => {
      const energyStorages = creep.pos.findInRange(FIND_MY_STRUCTURES, range, opts);
      if (energyStorages.length > 0) {
        return energyStorages[0];
      }
    };
  }
  return creep => creep.pos.findClosestByPath(FIND_MY_STRUCTURES, opts);
}

module.exports = (next, empty, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return empty;
  }
  const energyStorage = creep.getMemoryObject('transferEnergyStorage', getFind(opts.range), { validate: validate });
  if (!energyStorage) {
    return next;
  }
  creep.moveToAnd('transfer', [energyStorage, RESOURCE_ENERGY]);
};
