'use strict';

function findExtensionOrSpawn(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      (
        structure.structureType == STRUCTURE_EXTENSION
        ||
        structure.structureType == STRUCTURE_SPAWN
      )
      &&
      structure.energy < structure.energyCapacity
  });
}

function findTower(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_TOWER
      &&
      structure.energy < structure.energyCapacity
  });
}

function findTransferStructure(creep) {
  return findExtensionOrSpawn(creep) || findTower(creep);
}

module.exports = (creep, results) => {
  if (creep.carry.energy === 0) {
    return results.FINISHED;
  }
  var transferStructure;
  if (!creep.memory.transferStructure
    || !(transferStructure = Game.getObjectById(creep.memory.transferStructure))) {
    transferStructure = findTransferStructure(creep);
    if (!transferStructure) {
      delete creep.memory.transferStructure;
      return results.FINISHED;
    }
    creep.memory.transferStructure = transferStructure.id;
  }
  if (creep.transfer(transferStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if (transferStructure.energy === transferStructure.energyCapacity) {
      delete creep.memory.transferStructure;
      return results.FINISHED;
    }
    creep.moveTo(transferStructure);
    return results.NEXTTICK;
  }
  delete creep.memory.transferStructure;
  return results.FINISHED | results.NEXTTICK;
};
