'use strict';

function find(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length > 0) {
    return _.sample(sources);
  }
}

function run(creep) {
  var source;
  if (!creep.memory.source ||
      !(source = Game.getObjectById(creep.memory.source))) {
    source = find(creep);
  }
  if (!source) {
    delete creep.memory.source;
    return true;
  }
  creep.memory.source = source.id;
  if (source.energy === 0) {
    return true;
  }
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  } else {
    if (creep.carry.energy === creep.carryCapacity) {
      return true;
    }
  }
}

module.exports = (next, harvest) => {
  return {
    harvestSource: {
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
