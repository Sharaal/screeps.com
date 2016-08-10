'use strict';

function run(creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    return true;
  }
  var homeEnergyStorage;
  if (!creep.memory.homeEnergyStorage ||
      !(homeEnergyStorage = Game.getObjectById(creep.memory.homeEnergyStorage))) {
    homeEnergyStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_STORAGE
    });
    creep.memory.homeEnergyStorage = homeEnergyStorage.id;
  }
  if (!homeEnergyStorage) {
    return true;
  }
  if (creep.withdraw(homeEnergyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(homeEnergyStorage);
  }
}

module.exports = (next, harvest) => {
  return {
    'harvestHomeEnergyStorage': {
      run,
      next: creep => creep.carry.energy === creep.carryCapacity ? next : harvest
    }
  };
};
