'use strict';

var memoryObject = require('util.MemoryObject');

function validate(energyStorage) {
  return energyStorage.store.energy > 0;
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      structure.store.energy > 0
  });
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === creep.carryCapacity) {
    return next;
  }
  var energyStorage = memoryObject(creep, 'harvestEnergyStorage', validate, find);
  if (!energyStorage) {
    return harvest;
  }
  if (creep.withdraw(energyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
  }
};
