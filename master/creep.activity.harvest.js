'use strict';

module.exports = creep => {
  var sources = creep.room.find(FIND_SOURCES);

  if (creep.memory.source && !sources[creep.memory.source]) {
    delete creep.memory.source;
  }
  if (!creep.memory.source) {
    creep.memory.source = _.sample(_.keys(sources));
  }

  var source = sources[creep.memory.source];

  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  } else {
    if (creep.carry.energy === creep.carryCapacity) {
      return true;
    }
  }
};
