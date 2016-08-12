'use strict';

module.exports = roles => creep => {
  if (creep.spawning) {
    return;
  }
  var role = roles[creep.memory.role];
  if (!role) {
    creep.say('!');
    console.log(`creep "${creep.name}" has unknown role "${creep.memory.role}"`);
    return;
  }
  var activity = role.activities[creep.memory.activity];
  if (!activity) {
    creep.say('!');
    console.log(`creep "${creep.name}" has unknown activity "${creep.memory.activity}" in the role "${creep.memory.role}"`);
    return;
  }
  creep.memory.activity = activity(creep) || creep.memory.activity;
};
