'use strict';

var memoryObject = require('util.MemoryObject');

function find(creep) {
  var claimFlag = Game.flags.claim;
  if (!claimFlag) {
    return;
  }
  if (!claimFlag.room || claimFlag.room.name !== creep.room.name) {
    creep.moveTo(claimFlag);
    return;
  }
  return creep.room.controller;
}

module.exports = next => creep => {
  var claimController = memoryObject(creep, 'flagClaimNeutralController', find);
  if (!claimController) {
    return;
  }
  if (creep.claimController(claimController) === ERR_NOT_IN_RANGE) {
    creep.moveTo(claimController);
  } else {
    return next;
  }
};
