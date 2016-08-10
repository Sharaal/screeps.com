'use strict';

function run(creep) {
  var workParts = creep.body.filter(part => part.type === WORK).length;
  if (creep.carry.energy <= (workParts * 5)) {
    delete creep.memory.spawn;
    return true;
  }
  var spawn;
  if (!creep.memory.spawn ||
      !(spawn = Game.getObjectById(creep.memory.spawn))) {
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
  }
  if (!spawn) {
    delete creep.memory.spawn;
    return true;
  }
  if (creep.build(spawn) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn);
  } else {
    if (creep.carry.energy === 0) {
      delete creep.memory.spawn;
      return true;
    }
  }
  creep.memory.spawn = spawn.id;
}

module.exports = (next, harvest) => {
  return {
    buildSpawn: {
      run,
      next: creep => creep.carry.energy > 0 ? next : harvest
    }
  };
};
