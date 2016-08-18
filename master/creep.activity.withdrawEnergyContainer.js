'use strict';

function validate(energyContainer) {
  return !energyContainer.isEmpty();
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_CONTAINER
      &&
      validate(structure)
  });
}

module.exports = (full, next) => creep => {
  if (creep.isFull()) {
    return full;
  }
  const energyContainer = creep.getMemoryObject('withdrawEnergyContainer', validate, find);
  if (!energyContainer) {
    return next;
  }
  creep.moveToAnd('withdraw', [energyContainer, RESOURCE_ENERGY]);
};
