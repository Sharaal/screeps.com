'use strict';

module.exports = roles => {
  _.each(roles, (role, name) => {
    var creeps = _.filter(Game.creeps, creep => creep.memory.role === name);
    if (creeps.length < role.spawn.amount) {
      Game.spawns['Spawn1'].createCreep(role.spawn.body, undefined, { role: name });
    }
  });
};
