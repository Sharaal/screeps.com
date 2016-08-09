'use strict';

function run(creep) {
  var source;
  if (!creep.memory.source ||
      !(source = Game.getObjectById(creep.memory.source))) {
    var sources = creep.room.find(FIND_SOURCES);
    if (sources.length > 0) {
      sources = _.sortBy(sources,
        source => creep.room.find(FIND_MY_CREEPS, {
          filter: creep => creep.memory.source === source.id
        }).length
      );
      source = sources[0];
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
    if (creep.carry.energy > 0 && creep.carry.energy === creep.carryCapacity) {
      return true;
    }
  }
}

module.exports = (next, harvest) => {
  return {
    'harvestSource': {
      run,
      next: creep => creep.carry.energy > 0 && creep.carry.energy === creep.carryCapacity ? next : harvest
    }
  };
};
