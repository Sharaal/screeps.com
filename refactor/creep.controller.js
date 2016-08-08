'use strict';

module.exports = roles => creep => {
  if (creep.spawning) {
    return;
  }
  var role = roles[creep.memory.role];
  if (!role) {
    creep.say('missing role');
    return;
  }
  var activity = role.activities[creep.memory.activity];
  if (!activity) {
    creep.say('missing activity');
    return;
  }
  if (!activity.run(creep)) {
    return;
  }
  if (typeof activity.next === 'function') {
    creep.memory.activity = activity.next(creep);
  } else {
    creep.memory.activity = activity.next;
  }
};
