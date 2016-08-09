'use strict';

function run(creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    delete creep.memory.energyStorage;
    return true;
  }
  var energyStorage;
  if (!creep.memory.energyStorage ||
      !(energyStorage = Game.getObjectById(creep.memory.energyStorage)) ||
      !(energyStorage.store.energy > 0)) {
    energyStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType == STRUCTURE_STORAGE
        &&
        structure.store.energy > 0
    });
  }
  if (!energyStorage) {
    delete creep.memory.energyStorage;
    return true;
  }
  if (creep.withdraw(energyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
  }
  creep.memory.energyStorage = energyStorage.id;
}

module.exports = (next, harvest) => {
  return {
    'harvestEnergyStorage': {
      run,
      next: creep => creep.carry.energy === creep.carryCapacity ? next : harvest
    }
  };
};
