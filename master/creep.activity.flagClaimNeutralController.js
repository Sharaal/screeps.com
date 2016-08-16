'use strict';

module.exports = next => creep => {
  var claimFlag = Game.flags.claim;
  if (!claimFlag) {
    return;
  }
  if (!claimFlag.room || claimFlag.room.name !== creep.room.name) {
    creep.moveTo(claimFlag);
    return;
  }
  var claimController = creep.room.controller;
  if (creep.claimController(claimController) === ERR_NOT_IN_RANGE) {
    creep.moveTo(claimController);
    return;
  } 
  return next;
};
