'use strict';

module.exports = next => creep => {
  var claimFlag = Game.flags['claim'];
  if (claimFlag) {
    if (!claimFlag.room || claimFlag.room.name !== creep.room.name) {
      creep.moveTo(claimFlag);
      return;
    }
    if (!creep.moveToOr('claimController', creep.room.controller)) {
      return;
    }
  }
  return next;
};
