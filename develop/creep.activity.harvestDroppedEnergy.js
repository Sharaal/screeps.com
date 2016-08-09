'use strict';

function run(creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    delete creep.memory.droppedEnergy;
    return true;
  }
  var droppedEnergy;
  if (!creep.memory.droppedEnergy ||
      !(droppedEnergy = Game.getObjectById(creep.memory.droppedEnergy))) {
    droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
  }
  if (!droppedEnergy) {
    delete creep.memory.droppedEnergy;
    return true;
  }
  if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
    creep.moveTo(droppedEnergy);
  }
  creep.memory.droppedEnergy = droppedEnergy.id;
}

module.exports = (next, harvest) => {
  return {
    'harvestDroppedEnergy': {
      run,
      next: creep => creep.carry.energy === creep.carryCapacity ? next : harvest
    }
  };
};
