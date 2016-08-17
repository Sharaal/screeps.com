'use strict';

function validate(energyContainer) {
  return !energyContainer.isFull();
}

function getFind(range) {
  var opts = {
    filter: structure =>
      structure.structureType === STRUCTURE_CONTAINER
      &&
      validate(structure)
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

module.exports = (next, needEnergy, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return needEnergy;
  }
  var energyContainer = creep.getMemoryObject('transferEnergyContainer', validate, getFind(opts.range));
  if (!energyContainer) {
    return next;
  }
  creep.moveToOr('transfer', [energyContainer, RESOURCE_ENERGY]);
};
