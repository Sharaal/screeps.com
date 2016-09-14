'use strict';

module.exports = (roles, oldRole, newRole) => {
  _.each(Game.creeps, creep => {
    if (creep.memory.role !== oldRole) {
      return;
    }
    creep.memory.role = newRole;
    const role = roles[newRole];
    if (!role) {
      return;
    }
    creep.memory.activity = Object.keys(role.activities)[0];
  });
};
