'use strict';

function run(creep) {
  var claimController;
  if (!creep.memory.claimController ||
      !(claimController = Game.getObjectById(creep.memory.claimController))) {
    var claimFlag = Game.flags.claim;
    if (!claimFlag) {
      return true;
    }
    if (claimFlag.room && claimFlag.room.name === creep.room.name) {
      claimController = creep.room.controller;
      creep.memory.claimController = claimController.id;
    } else {
      creep.moveTo(claimFlag);
      return;
    }
  }
  if (!claimController) {
    delete creep.memory.claimController;
    return true;
  }
  if (creep.claimController(claimController) === ERR_NOT_IN_RANGE) {
    creep.moveTo(claimController);
  } else {
    return true;
  }
}

module.exports = next => {
  return {
    'flagClaimNeutralController': { run, next }
  };
};
