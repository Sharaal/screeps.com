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

module.exports = (next, needEnergy) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var energyContainer = creep.getMemoryObject('withdrawEnergyContainer', validate, find);
  if (!energyContainer) {
    return needEnergy;
  }
  creep.moveToOr('withdraw', [energyContainer, RESOURCE_ENERGY]);
};
