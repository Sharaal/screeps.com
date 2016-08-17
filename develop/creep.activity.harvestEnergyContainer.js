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

module.exports = (next, harvest) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var energyContainer = creep.getMemoryObject('harvestEnergyContainer', validate, find);
  if (!energyContainer) {
    return harvest;
  }
  creep.moveToOr('withdraw', [energyContainer, RESOURCE_ENERGY]);
};
