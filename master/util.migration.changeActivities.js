'use strict';

module.exports = (oldActivity, newActivity) => {
  _.each(Game.creeps, creep => {
    if (creep.memory.activity !== oldActivity) {
      return;
    }
    creep.memory.activity = newActivity;
    const value = creep.memory[oldActivity];
    if (!value) {
      return;
    }
    creep.memory[newActivity] = value;
    delete creep.memory[oldActivity];
  });
};
