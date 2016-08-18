'use strict';

function find(creep) {
  return creep.room.getNeighboringSpawnConstructionSite();
}

module.exports = (next, nearlyEmpty) => creep => {
  if (creep.isEmpty({ restAmount: creep.getWorkAmount(BUILD_POWER) })) {
    return nearlyEmpty;
  }
  const spawn = creep.getMemoryObject('buildSpawn', find);
  if (!spawn) {
    return next;
  }
  creep.moveToAnd('build', spawn);
};
