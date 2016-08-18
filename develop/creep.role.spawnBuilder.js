'use strict';

module.exports = {
  activities: {
    'withdrawEnergyStorage': require('./creep.activity.withdrawEnergyStorage')('buildSpawn',          'withdrawEnergyStorage'),
    'pickupDroppedEnergy':   require('./creep.activity.pickupDroppedEnergy')  ('buildSpawn',          'harvestSource'),
    'harvestSource':         require('./creep.activity.harvestSource')        ('buildSpawn',          'pickupDroppedEnergy'),
    'buildSpawn':            require('./creep.activity.buildSpawn')           ('upgradeController',   'rescueController'),
    'rescueController':      require('./creep.activity.upgradeController')    ('pickupDroppedEnergy', 'pickupDroppedEnergy', { ticksToDowngrade: 2500 }),
    'upgradeController':     require('./creep.activity.upgradeController')    ('upgradeController',   'pickupDroppedEnergy')
  },
  spawn: room => {
    if (!room.hasNeighboringSpawnConstructionSite()) {
      return;
    }
    return {
      body: { carry: 10, move: 5, work: 1 },
      mapAmount: 1
    };
  }
};
