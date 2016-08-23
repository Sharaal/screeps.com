'use strict';

const empty = 'withdrawEnergyStorage';

module.exports = {
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',      'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',      'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',      empty),
    'rescueController':        require('./creep.activity.upgradeController')      ('buildConstructionSite', empty, { ticksToDowngrade: 2500 }),
    'buildConstructionSite':   require('./creep.activity.buildConstructionSite')  ('upgradeController',     empty),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController',     empty)
  },
  spawn: room => {
    let body = { carry: 2, move: 1, work: 1 };
    let roomAmount;
    if (room.isHeavyUpgradeable()) {
      if (room.energyCapacityAvailable >= 1000) {
        body = { carry: 8, move: 4, work: 4 };
      }
      roomAmount = room.getSourcesAmount() * 6;
    } else {
      roomAmount = room.getSourcesAmount() * 3;
    }
    return {
      priority: 1,
      body: body,
      roomAmount: roomAmount
    };
  }
};
