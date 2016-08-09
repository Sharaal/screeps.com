'use strict';

function run(creep) {
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  } else {
    return true;
  }
}

module.exports = (next, harvest) => {
  return {
    upgradeController: {
      run,
      next: creep => creep.carry.energy > 0 ? next : harvest
    }
  };
};
