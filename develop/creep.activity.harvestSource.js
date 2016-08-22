'use strict';

const harvestSourcePositions = require('./memory.harvestSourcePositions');

function findBySourceFlag(creep) {
  let flag;
  if (creep.memory.flagName) {
    flag = Game.flags[creep.memory.flagName];
  } else {
    flag = creep.room.getFlag(/^source/);
  }
  if (flag) {
    return flag.pos.findClosestByRange(FIND_SOURCES);
  }
}

function findByCreepDistribution(creep) {
  let sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.error('missing source');
    return;
  }
  sources = _.sortBy(sources,
    source => {
      const creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.harvestSource === source.id
      });
      return creeps.length / harvestSourcePositions.getAmountBySource(source);
    }
  );
  return sources[0];
}

function find(creep) {
  return findBySourceFlag(creep) || findByCreepDistribution(creep);
}

module.exports = (full, next) => creep => {
  if (creep.isFull({ restCapacity: creep.getWorkAmount(HARVEST_POWER) })) {
    return full;
  }
  const source = creep.getMemoryObject('harvestSource', find);
  if (!source || source.isEmpty()) {
    return next;
  }
  creep.moveToAnd('harvest', source);
};
