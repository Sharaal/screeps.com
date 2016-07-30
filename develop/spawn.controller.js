'use strict';

module.exports = roles => spawn => {
  _.each(roles, (role, name) => {
    var creeps = _.filter(Game.creeps, creep => creep.memory.role === name);
    if (creeps.length < role.spawn.amount) {
      spawn.createCreep(role.spawn.body, undefined, { role: name });
    }
  });
};
