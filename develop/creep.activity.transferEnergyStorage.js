'use strict';

var memoryObject = require('util.MemoryObject');

function validate(energyStorage) {
  return ((energyStorage.store.energy || 0) + (energyStorage.store.L || 0)) < energyStorage.storeCapacity;
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      ((structure.store.energy || 0) + (structure.store.L || 0)) < structure.storeCapacity
  });
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === 0) {
    return harvest;
  }
  var energyStorage = memoryObject(creep, 'transferEnergyStorage', validate, find);
  if (!energyStorage) {
    return next;
  }
  if (creep.transfer(energyStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
  }
};
