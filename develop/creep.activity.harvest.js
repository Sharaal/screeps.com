'use strict';

var memoryRandomSelect = require('./util.memory-random-select');

module.exports = creep => {
  var sources = creep.room.find(FIND_SOURCES);

  var source = memoryRandomSelect(creep, 'source', sources);
  if (!source) {
    return true;
  }

  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  } else {
    if (creep.carry.energy === creep.carryCapacity) {
      return true;
    }
  }
};
