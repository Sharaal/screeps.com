'use strict';

module.exports = creep => {
  var target;
  if (creep.memory.target === 'roomController') {
    target = creep.room.controller;
  } else {
    target = Game.getObjectById(creep.memory[creep.memory.target]);
  }
  creep.moveTo(target);
  if (creep.pos.isNearTo(target)) {
    delete creep.memory.target;
    return true;
  }
};
