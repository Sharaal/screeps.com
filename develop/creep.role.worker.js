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
    let roomAmount;
    if (!room.isHeavyUpgradeable()) {
      roomAmount = room.getSourcesAmount() * 3;
    }
    return {
      priority: 1,
      body: { carry: 2, move: 1, work: 1 },
      roomAmount: roomAmount
    };
  }
};
