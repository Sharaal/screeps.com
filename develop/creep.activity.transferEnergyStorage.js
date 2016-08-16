'use strict';

var memoryObject = require('./util.memoryObject');

function validate(energyStorage) {
  return ((energyStorage.store.energy || 0) + (energyStorage.store.L || 0)) < energyStorage.storeCapacity;
}

function getFind(range) {
  var opts = {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      ((structure.store.energy || 0) + (structure.store.L || 0)) < structure.storeCapacity
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

module.exports = (next, harvest, opts) => creep => {
  opts = opts || {};
  if (creep.carry.energy === 0) {
    return harvest;
  }
  var energyStorage = memoryObject(creep, 'transferEnergyStorage', validate, getFind(opts.range));
  if (!energyStorage) {
    return next;
  }
  if (creep.transfer(energyStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
  }
};
