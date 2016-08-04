'use strict';

var results = {
  FINISHED: 1,
  NEXTTICK: 2
};

module.exports = roles => creep => {
  if (creep.spawning) {
    return;
  }
  var activities = roles[creep.memory.role].activities;
  do {
    var activity = activities[creep.memory.activity];
    var result = activity.run(creep, results);
    if (result & results.FINISHED) {
      if (typeof activity.next === 'function') {
        creep.memory.activity = activity.next(creep);
      } else {
        creep.memory.activity = activity.next;
      }
    }
  } while (!(result & results.NEXTTICK))
};
