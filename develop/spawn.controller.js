'use strict';

var levels = [
  require('./spawn.level-1'),
  require('./spawn.level-2'),
];

module.exports = roles => spawn => {
  var priorities;
  _.each(levels, level => {
    if (level.conditions) {
      if (level.conditions.level && spawn.room.controller.level < level.conditions.level) {
        return;
      }
      if (level.conditions.energyCapacityAvailable && spawn.room.energyCapacityAvailable < level.conditions.energyCapacityAvailable) {
        return;
      }
    }
    priorities = level.priorities;
  });
  if (!priorities) {
    return;
  }

  var order;
  _.each(priorities, priority => {
    if (order) {
      return;
    }
    var creeps = spawn.room.find(FIND_CREEPS, {
      filter: creep => creep.memory.role === priority.role
    });
    if (creeps.length < priority.amount) {
      order = priority;
    }
  });
  if (!order) {
    return;
  }

  spawn.createCreep(order.body, undefined, { role: order.role });
};
