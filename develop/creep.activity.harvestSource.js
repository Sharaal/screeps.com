'use strict';

module.exports = (creep, results) => {
  var source = Game.getObjectById(creep.memory.source);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  } else {
    if (creep.carry.energy === creep.carryCapacity) {
      return results.FINISHED;
    }
  }
  return results.NEXTTICK;
};
