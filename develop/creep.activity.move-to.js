'use strict';

module.exports = creep => {
  var target;
  if (creep.memory.target === 'roomController') {
    target = creep.room.controller;
  } else {
    target = Game.getObjectById(creep.memory[creep.memory.target]);
  }
  creep.moveTo(target);
  if (creep.memory.range) {
    if (!creep.pos.inRangeTo(target, creep.memory.range)) {
      return;
    }
  } else {
    if (!creep.pos.isNearTo(target)) {
      return;
    }
  }
  delete creep.memory.target;
  delete creep.memory.range;
  return true;
};
