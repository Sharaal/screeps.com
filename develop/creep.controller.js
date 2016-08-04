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
      var next;
      if (typeof activity.next === 'function') {
        next = activity.next(creep);
      } else {
        next = activity.next;
      }
      if (typeof next === 'string') {
        creep.memory.activity = next;
      } else {
        break;
      }
    }
  } while (!(result & results.NEXTTICK))
};
