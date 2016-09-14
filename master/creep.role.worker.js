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
    if (room.hasFlag(/spawn builder target/)) {
      return;
    }
    
    let workParts = 4;

    let body = { carry: 2, move: 1, work: 1 };
    
    if (room.energyCapacityAvailable >= 500) {
      body = { carry: 4, move: 2, work: 2 };
    }
    
    if (room.isHeavyUpgradeable()) {
      if (room.energyCapacityAvailable >= 1000) {
        body = { carry: 8, move: 4, work: 4 };
      }
      workParts = 16;
    }
    
    if (room.hasFlag(/spawn builder spawn/)) {
      workParts = 4;
    }
    
    return {
      priority: 1,
      body: body,
      roomAmount: room.getSourcesAmount() * (workParts / body.work)
    };
  }
};
