'use strict';

// TODO
// finish implementation

function needRenew(creep) {
  var missing = 1500 - creep.ticksToLive;
  var renew = Math.floor(600 / creep.body.length);
  return missing >= renew;
}

module.exports = (creep, results, structureSpawn) => {
  if (creep.body.indexOf(CLAIM) !== -1) {
    return true;
  }
  if (!needRenew(creep)) {
    return true;
  }
  structureSpawn.renewCreep(creep);
};

// TODO
// creeps in rooms which are larger (body parts costs >
// room.energyCapacityAvailable) should proactive go to renew

// TODO
// creeps which are near the spawn controller can easily get renewed, but this
// shouldn't block the workflow of the creeps
