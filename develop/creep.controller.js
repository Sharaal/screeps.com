'use strict';

var roles = {
  builder: require('./creep.role.builder'),
  transferer: require('./creep.role.transferer'),
  upgrader: require('./creep.role.upgrader')
};

module.exports = creep => {
  if (!roles[creep.memory.role]) {
    creep.memory.role = 'upgrader';
  }

  var activities = roles[creep.memory.role];

  if (creep.memory.activity && !activities[creep.memory.activity]) {
    delete creep.memory.activity;
  }
  if (!creep.memory.activity) {
    creep.memory.activity = _.keys(activities)[0];
  }

  var activity = activities[creep.memory.activity];
  if (activity.do(creep)) {
    if (typeof activity.next === 'function') {
      creep.memory.activity = activity.next(creep);
    } else {
      creep.memory.activity = activity.next;
    }
  }
};
