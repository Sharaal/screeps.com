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

  var order;
  _.each(highestLevel.priorities, priority => {
    if (order) {
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
    order = priority;
  });
  if (!order) {
    return;
  }

  var spawns = room.find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
  _.each(spawns, spawn => {
    if (!order) {
      return;
    }
    var memory = { role: order.role, activity: roles[order.role].startActivity };
    if (spawn.createCreep(transformBody(highestLevel.bodies[order.body]), undefined, memory) !== OK) {
      return;
    }
    order = undefined;
  });
};
