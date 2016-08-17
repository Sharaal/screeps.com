'use strict';

function find() {
  var spawn;
  _.each(Game.rooms, room => {
    var spawns = room.find(FIND_MY_CONSTRUCTION_SITES, { 
      filter: constructionSite => constructionSite.structureType === STRUCTURE_SPAWN
    });
    if (spawns.length > 0) {
      spawn = spawns[0];
    }
  });
  return spawn;
}

module.exports = (next, nearlyEmpty) => creep => {
  var workParts = creep.getActiveBodyparts(WORK);
  if (creep.isEmpty(workParts.length * 5)) {
    return nearlyEmpty;
  }
  var spawn = creep.getMemoryObject('buildSpawn', find);
  if (!spawn) {
    return next;
  }
  creep.moveToOr('build', spawn);
};
