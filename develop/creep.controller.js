'use strict';

module.exports = roles => creep => {
  if (creep.spawning) {
    return;
  }
  var activities = roles[creep.memory.role].activities;
  do {
    var activity = activities[creep.memory.activity];
    var isFinished = activity.run(creep);
    if (isFinished) {
      if (typeof activity.next === 'function') {
        creep.memory.activity = activity.next(creep);
      } else {
        creep.memory.activity = activity.next;
      }
    }
  } while (isFinished)
};
