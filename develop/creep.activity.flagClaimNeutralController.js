'use strict';

module.exports = next => creep => {
  const claimFlag = Game.flags['claim'];
  if (claimFlag) {
    if (claimFlag.room.name !== creep.room.name) {
      creep.moveTo(claimFlag);
      return;
    }
    if (!creep.moveToAnd('claimController', creep.room.controller)) {
      return;
    }
  }
  return next;
};
