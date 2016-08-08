'use strict';

function findEnergyStorage(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      structure.store.energy > 0
  });
}

function getEnergyStorage(creep) {
  var energyStorage;
  if (!creep.memory.energyStorage
      || !(energyStorage = Game.getObjectById(creep.memory.energyStorage))) {
    energyStorage = findEnergyStorage(creep);
  }
  if (!energyStorage || energyStorage.store.energy === 0) {
    delete creep.memory.energyStorage;
    return;
  }
  creep.memory.energyStorage = energyStorage.id;
  return energyStorage;
}

module.exports = creep => {
  var energyStorage = getEnergyStorage(creep);
  if (!energyStorage) {
    return true;
  }
  if (creep.withdraw(energyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
    return;
  }
  delete creep.memory.energyStorage;
  return true;
};
