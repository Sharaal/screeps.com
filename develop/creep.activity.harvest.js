'use strict';

module.exports = creep => {
  var source = Game.getObjectById(creep.memory.source);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
    return;
  }
  if (creep.carry.energy === creep.carryCapacity) {
    return true;
  }
};
