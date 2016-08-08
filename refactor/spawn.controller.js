'use strict';

var levels = [
  require('./spawn.level-1'),
  require('./spawn.level-2'),
  require('./spawn.level-4-storage'),
];

module.exports = roles => spawn => {
  var priorities;
  _.each(levels, level => {
    if (!level.conditions(spawn)) {
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
