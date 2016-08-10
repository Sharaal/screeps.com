'use strict';

var memoryObject = require('util.MemoryObject');

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_STORAGE
  });
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === creep.carryCapacity) {
    return next;
  }
  var homeEnergyStorage = memoryObject(creep, 'harvestHomeEnergyStorage', find);
  if (!homeEnergyStorage) {
    return harvest;
  }
  if (creep.withdraw(homeEnergyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(homeEnergyStorage);
  }
};
