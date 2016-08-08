'use strict';

function run(creep) {
  if (creep.carry.energy === 0) {
    delete creep.memory.transferEnergyStorage;
    return true;
  }
  var transferEnergyStorage;
  if (!creep.memory.transferEnergyStorage ||
      !(transferEnergyStorage = Game.getObjectById(creep.memory.transferEnergyStorage))) {
    transferEnergyStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType == STRUCTURE_STORAGE
        &&
        (structure.store.energy + structure.store.L) < structure.storeCapacity
    });
  }
  if (!transferEnergyStorage || (transferEnergyStorage.store.energy + transferEnergyStorage.store.L) === transferEnergyStorage.storeCapacity) {
    delete creep.memory.transferEnergyStorage;
    return true;
  }
  creep.memory.transferEnergyStorage = transferEnergyStorage.id;
  if (creep.transfer(transferEnergyStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferEnergyStorage);
  }
}

module.exports = (next, harvest) => {
  return {
    transferEnergyStorage: {
      run,
      next: creep => creep.carry.energy > 0 ? next : harvest
    }
  };
};
