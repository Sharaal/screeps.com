'use strict';

var memoryObject = require('util.memoryObject');

function validate(energyContainer) {
  return ((energyContainer.store.energy || 0) + (energyContainer.store.L || 0)) < energyContainer.storeCapacity;
}

function getFind(range) {
  var opts = {
    filter: structure =>
      structure.structureType == STRUCTURE_CONTAINER
      &&
      ((structure.store.energy || 0) + (structure.store.L || 0)) < structure.storeCapacity
  };
  if (range) {
    return creep => {
      var energyContainers = creep.pos.findInRange(FIND_MY_STRUCTURES, range, opts);
      if (energyContainers.length > 0) {
        return energyContainers[0];
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
  var energyContainer = memoryObject(creep, 'transferEnergyContainer', validate, getFind(opts.range));
  if (!energyContainer) {
    return next;
  }
  if (creep.transfer(energyContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(energyContainer);
  }
};
