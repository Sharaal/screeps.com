'use strict';

function validate(energyContainer) {
  return energyContainer.store.energy > 0;
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_CONTAINER
      &&
      structure.store.energy > 0
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
