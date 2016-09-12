'use strict';

const empty = 'withdrawEnergyStorage';

module.exports = {
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',  'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',  'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',  'harvestSource'),
    'harvestSource':           require('./creep.activity.harvestSource')          ('rescueController',  empty),
    'rescueController':        require('./creep.activity.upgradeController')      ('transferStructure', empty, { ticksToDowngrade: 3500 }),
    'transferStructure':       require('./creep.activity.transferStructure')      ('rescueController',  empty)
  },
  spawn: room => {
    const creeps = room.find(FIND_MY_CREEPS);
    if (creeps.length > 0 && room.controller.ticksToDowngrade >= 3500) {
      return;
    }
    return {
      priority: Infinity,
      body: { carry: 1, move: 1, work: 1 },
      roomAmount: 1
    };
  }
};
