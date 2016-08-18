'use strict';

module.exports = (roles, oldRole, newRole) => {
  _.each(Game.creeps, creep => {
    if (creep.memory.role === oldRole) {
      creep.memory.role = newRole;
      const role = roles[newRole];
      if (!role) {
        return;
      }
      creep.memory.activity = roles[newRole].startActivity;
    }
  });
};
