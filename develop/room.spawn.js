'use strict';

var transformBody = require('./util.transformBody');
var levels = [
  require('./room.spawn.level.1'),
  require('./room.spawn.level.2'),
  require('./room.spawn.level.4'),
  require('./room.spawn.level.4-storage'),
  require('./room.spawn.level.4-storage-full'),

  require('./room.spawn.rescuer')
];

module.exports = roles => room => {
  var highestLevel;
  _.each(levels, level => {
    if (!level.conditions(room)) {
      return;
    }
    highestLevel = level;
  });
  if (!highestLevel) {
    return;
  }

  var spawnOrder;
  _.each(highestLevel.priorities, priority => {
    if (spawnOrder) {
      return;
    }
    if (roles[priority.role].roomConditions && !roles[priority.role].roomConditions(room)) {
      return;
    }
    if (priority.globalAmount) {
      var globalCreeps = _.filter(Game.creeps, creep => creep.memory.role === priority.role);
      if (globalCreeps.length >= priority.globalAmount) {
        return;
      }
    }
    if (priority.amount) {
      var amount;
      if (typeof priority.amount === 'function') {
        amount = priority.amount(room);
      } else {
        amount = priority.amount;
      }
      var roomCreeps = room.find(FIND_MY_CREEPS, { filter: creep => creep.memory.role === priority.role });
      if (roomCreeps.length >= amount) {
        return;
      }
    }
    spawnOrder = priority;
  });
  if (!spawnOrder) {
    return;
  }

  var spawns = room.find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
  _.each(spawns, spawn => {
    if (!spawnOrder) {
      return;
    }
    var memory = { role: spawnOrder.role, activity: roles[spawnOrder.role].startActivity };
    if (spawn.createCreep(transformBody(highestLevel.bodies[spawnOrder.body]), undefined, memory) !== OK) {
      return;
    }
    spawnOrder = undefined;
  });
};
