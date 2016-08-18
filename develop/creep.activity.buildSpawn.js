'use strict';

function find(creep) {
  return creep.room.getNeighboringSpawnConstructionSite();
}

module.exports = (next, nearlyEmpty) => creep => {
  const buildAmount = creep.getActiveBodyparts(WORK) * BUILD_POWER;
  if (creep.isEmpty({ restAmount: buildAmount })) {
    return nearlyEmpty;
  }
  const spawn = creep.getMemoryObject('buildSpawn', find);
  if (!spawn) {
    return next;
  }
  creep.moveToAnd('build', spawn);
};
