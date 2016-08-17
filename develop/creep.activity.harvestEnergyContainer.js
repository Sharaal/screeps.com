'use strict';

var memoryObject = require('./util.memoryObject');

function validate(energyContainer) {
  return energyContainer.store.energy > 0;
}

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_CONTAINER
      &&
      structure.store.energy > 0
  });
}

module.exports = (next, harvest) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var energyContainer = memoryObject(creep, 'harvestEnergyContainer', validate, find);
  if (!energyContainer) {
    return harvest;
  }
  if (creep.withdraw(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(energyContainer);
  }
};
