'use strict';

function find(creep) {
  return creep.room.getNeighboringSpawnConstructionSite();
}

module.exports = (next, nearlyEmpty) => creep => {
  if (creep.isEmpty({ restAmount: creep.getActiveBodyparts(WORK) * BUILD_POWER })) {
    return nearlyEmpty;
  }
  var spawn = creep.getMemoryObject('buildSpawn', find);
  if (!spawn) {
    return next;
  }
  creep.moveToAnd('build', spawn);
};
