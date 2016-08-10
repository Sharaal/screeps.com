'use strict';

var memoryObject = require('util.MemoryObject');

function find() {
  var spawn;
  _.each(Game.rooms, room => {
    if (spawn) {
      return;
    }
    if (!room.controller.my) {
      return;
    }
    _.each(room.find(FIND_CONSTRUCTION_SITES), constructionSite => {
      if (spawn) {
        return;
      }
      if (constructionSite.structureType === STRUCTURE_SPAWN) {
        spawn = constructionSite;
      }
    });
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
