'use strict';

module.exports = (oldActivity, newActivity) => {
  _.each(Game.creeps, creep => {
    if (creep.memory.activity === oldActivity) {
      creep.memory.activity = newActivity;
      if (creep.memory[oldActivity]) {
        creep.memory[newActivity] = creep.memory[oldActivity];
        delete creep.memory[oldActivity];
      }
    }
  });
};
