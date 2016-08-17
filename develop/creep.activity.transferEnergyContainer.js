'use strict';

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
      var energyContainers = creep.pos.findInRange(FIND_STRUCTURES, range, opts);
      if (energyContainers.length > 0) {
        return energyContainers[0];
      }
    };
  }
  return creep => creep.pos.findClosestByPath(FIND_STRUCTURES, opts);
}

module.exports = (next, harvest, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return harvest;
  }
  var energyContainer = creep.getMemoryObject('transferEnergyContainer', validate, getFind(opts.range));
  if (!energyContainer) {
    return next;
  }
  if (creep.transfer(energyContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(energyContainer);
  }
};
