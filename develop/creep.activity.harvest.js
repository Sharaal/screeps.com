'use strict';

module.exports = creep => {
  var source = Game.getObjectById(creep.memory.source);
  creep.harvest(source);
  if (creep.carry.energy === creep.carryCapacity) {
    return true;
  }
};
