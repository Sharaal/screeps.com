'use strict';

function validate(energyContainer) {
  return !energyContainer.isFull();
}

function getFind(range) {
  const opts = {
    filter: structure =>
      structure.structureType === STRUCTURE_CONTAINER
      &&
      validate(structure)
  };
  if (range) {
    return creep => {
      const energyContainers = creep.pos.findInRange(FIND_STRUCTURES, range, opts);
      if (energyContainers.length > 0) {
        return energyContainers[0];
      }
    };
  }
  return creep => creep.pos.findClosestByPath(FIND_STRUCTURES, opts);
}

module.exports = (next, empty, opts) => creep => {
  opts = opts || {};
  if (creep.isEmpty()) {
    return empty;
  }
  const energyContainer = creep.getMemoryObject('transferEnergyContainer', getFind(opts.range), { validate: validate });
  if (!energyContainer) {
    return next;
  }
  creep.moveToAnd('transfer', [energyContainer, RESOURCE_ENERGY]);
};
