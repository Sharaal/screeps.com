'use strict';

function run(creep) {
  var source;
  if (!creep.memory.source ||
      !(source = Game.getObjectById(creep.memory.source))) {
    var sources = creep.room.find(FIND_SOURCES);
    if (sources.length > 0) {
      source = _.sample(sources);
    }
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
      next: creep => creep.carry.energy === creep.carryCapacity ? next : harvest
    }
  };
};
