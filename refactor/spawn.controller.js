'use strict';

var levels = [
  require('./room.level-1'),
  require('./room.level-2'),
  require('./room.level-4-storage'),
];

module.exports = roles => spawn => {
  var priorities;
  _.each(levels, level => {
    if (!level.conditions(spawn.room)) {
      return;
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
    if (roles[priority.role].roomConditions && !roles[priority.role].roomConditions(spawn.room)) {
      return;
    }
    var creeps = spawn.room.find(FIND_CREEPS, {
      filter: creep => creep.my && creep.memory.role === priority.role
    });
    if (creeps.length < priority.amount) {
      order = priority;
    }
  });
  if (!order) {
    return;
  }

  spawn.createCreep(order.body, undefined, {
    role: order.role,
    activity: roles[order.role].startActivity
  });
};
