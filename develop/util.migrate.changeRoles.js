'use strict';

module.exports = (roles, oldRole, newRole) => {
  _.each(Game.creeps, creep => {
    if (creep.memory.role === oldRole) {
      creep.memory = { role: newRole, activity: roles[newRole].startActivity };
    }
  });
};
