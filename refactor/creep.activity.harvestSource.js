'use strict';

function findSource(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    return;
  }
  return _.sample(sources);
}

function getSource(creep) {
  var source;
  if (!creep.memory.source
      || !(source = Game.getObjectById(creep.memory.source))) {
    source = findSource(creep);
  }
  if (!source) {
    delete creep.memory.source;
    return;
  }
  creep.memory.source = source.id;
  if (source.energy === 0) {
    return;
  }
  return source;
}

module.exports = creep => {
  var source = getSource(creep);
  if (!source) {
    return true;
  }
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
    return;
  }
  if (creep.carry.energy === creep.carryCapacity) {
    return true;
  }
};
