'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');
var memoryObject = require('./util.memoryObject');

function find(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.say('!');
    console.log(`creep "${creep.name}" not found a source`);
    return;
  }
  sources = _.sortBy(sources,
    source => {
      var creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.source === source.id
      });
      return creeps.length / harvestSourcePositions.getAmountBySource(source);
    }
  );
  return sources[0];
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy > 0 && creep.carry.energy === creep.carryCapacity) {
    return next;
  }
  var source = memoryObject(creep, 'harvestSource', find);
  if (!source || source.energy === 0) {
    return harvest;
  }
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
};
