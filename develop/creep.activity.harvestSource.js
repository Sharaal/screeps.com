'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

function find(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.error('missing source');
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

module.exports = (next, empty) => creep => {
  if (creep.isFull({ restCapacity: creep.getActiveBodyparts(WORK) * HARVEST_POWER })) {
    return next;
  }
  var source = creep.getMemoryObject('harvestSource', find);
  if (!source || source.isEmpty()) {
    return empty;
  }
  creep.moveToAnd('harvest', source);
};
