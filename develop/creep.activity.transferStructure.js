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

function run(creep) {
  if (creep.carry.energy === 0) {
    delete creep.memory.transferStructure;
    return true;
  }
  var transferStructure;
  if (!creep.memory.transferStructure ||
    !(transferStructure = Game.getObjectById(creep.memory.transferStructure)) ||
    transferStructure.energy === transferStructure.energyCapacity) {
    transferStructure = findExtensionOrSpawn(creep) || findTower(creep);
  }
  if (!transferStructure) {
    delete creep.memory.transferStructure;
    return true;
  }
  if (creep.transfer(transferStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferStructure);
  }
  creep.memory.transferStructure = transferStructure.id;
}

module.exports = (next, harvest) => {
  return {
    'transferStructure': {
      run,
      next: creep => creep.carry.energy > 0 ? next : harvest
    }
  };
};
