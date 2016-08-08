'use strict';

function findTransferEnergyStorage(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      (structure.store.energy + structure.store.L) < structure.storeCapacity
  });
}

module.exports = (creep, results) => {
  var transferEnergyStorage;
  if (!creep.memory.transferEnergyStorage
    || !(transferEnergyStorage = Game.getObjectById(creep.memory.transferEnergyStorage))) {
    transferEnergyStorage = findTransferEnergyStorage(creep);
    if (!transferEnergyStorage) {
      delete creep.memory.transferEnergyStorage;
      return results.FINISHED;
    }
    creep.memory.transferEnergyStorage = transferEnergyStorage.id;
  }
  if (creep.transfer(transferEnergyStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if ((transferEnergyStorage.store.energy + transferEnergyStorage.store.L) === transferEnergyStorage.storeCapacity) {
      delete creep.memory.transferEnergyStorage;
      return results.FINISHED;
    }
    creep.moveTo(transferEnergyStorage);
    return results.NEXTTICK;
  }
  delete creep.memory.transferEnergyStorage;
  return results.FINISHED | results.NEXTTICK;
};
