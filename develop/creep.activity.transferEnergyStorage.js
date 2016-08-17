'use strict';

function validate(energyStorage) {
  return !energyStorage.isFull();
}

function getFind(range) {
  var opts = {
    filter: structure =>
      structure.structureType === STRUCTURE_STORAGE
      &&
      validate(structure)
  };
  if (range) {
    return creep => {
      var energyStorages = creep.pos.findInRange(FIND_MY_STRUCTURES, range, opts);
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
  var energyStorage = creep.getMemoryObject('transferEnergyStorage', validate, getFind(opts.range));
  if (!energyStorage) {
    return next;
  }
  creep.moveToOr('transfer', [energyStorage, RESOURCE_ENERGY]);
};
