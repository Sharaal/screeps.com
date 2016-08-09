'use strict';

// TODO finish implementation

function run(creep) {
  var room;
  if (!creep.memory.claimNeutralController ||
      !(room = Game.getObjectById(creep.memory.claimNeutralController))) {

    // ... find adjoining room with neutral controller and no other creep claiming it

    creep.memory.claimNeutralController = room.name;
  }
  if (!room) {
    delete creep.memory.claimNeutralController;
    return true;
  }
  if (creep.claimController(room.controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(room.controller);
  } else {
    return true;
  }
}

module.exports = next => {
  return {
    claimNeutralController: { run, next }
  };
};
