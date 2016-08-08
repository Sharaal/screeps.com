'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType == STRUCTURE_STORAGE
      &&
      structure.store.energy > 0
  });
}

function run(creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    delete creep.memory.energyStorage;
    return true;
  }
  var energyStorage;
  if (!creep.memory.energyStorage ||
      !(energyStorage = Game.getObjectById(creep.memory.energyStorage)) ||
      !(energyStorage.store.energy > 0)) {
    energyStorage = find(creep);
  }
  if (!energyStorage) {
    delete creep.memory.energyStorage;
    return true;
  }
  creep.memory.energyStorage = energyStorage.id;
  if (creep.withdraw(energyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStorage);
  }
}

module.exports = (next, harvest) => {
  return {
    harvestEnergyStore: {
      run,
      next: creep => {
        if (creep.carry.energy === creep.carryCapacity) {
          return next;
        }
        return harvest;
      }
    }
  };
};