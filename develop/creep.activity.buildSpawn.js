'use strict';

var memoryObject = require('util.memoryObject');

function find() {
  var spawn;
  _.each(Game.rooms, room => {
    if (spawn) {
      return;
    }
    if (!room.controller.my) {
      return;
    }
    var spawns = room.find(FIND_MY_CONSTRUCTION_SITES, { 
      filter: constructionSite => constructionSite.structureType == STRUCTURE_SPAWN
    });
    if (spawns.length > 0) {
      spawn = spawns[0];
    }
  });
  return spawn;
}

module.exports = next => creep => {
  var workParts = creep.body.filter(part => part.type === WORK);
  if (creep.carry.energy <= (workParts.length * 5)) {
    return next;
  }
  var spawn = memoryObject(creep, 'buildSpawn', find);
  if (!spawn) {
    return next;
  }
  if (creep.build(spawn) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn);
  }
};
