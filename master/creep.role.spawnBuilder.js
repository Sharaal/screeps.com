'use strict';

module.exports = {
  activities: {
    'moveToFlag':            require('./creep.activity.moveToFlag')           ('harvestSource',         'moveToFlag', { flagName: /^spawn builder target/ }),
    'withdrawEnergyStorage': require('./creep.activity.withdrawEnergyStorage')('buildSpawn',            'withdrawEnergyStorage'),
    'pickupDroppedEnergy':   require('./creep.activity.pickupDroppedEnergy')  ('buildSpawn',            'harvestSource'),
    'harvestSource':         require('./creep.activity.harvestSource')        ('buildSpawn',            'pickupDroppedEnergy'),
    'buildSpawn':            require('./creep.activity.buildSpawn')           ('transferStructure',     'rescueController'),
    'rescueController':      require('./creep.activity.upgradeController')    ('pickupDroppedEnergy',   'pickupDroppedEnergy', { ticksToDowngrade: 2500 }),
    'transferStructure':     require('./creep.activity.transferStructure')    ('buildConstructionSite', 'pickupDroppedEnergy'),
    'buildConstructionSite': require('./creep.activity.buildConstructionSite')('upgradeController',     'pickupDroppedEnergy'),
    'upgradeController':     require('./creep.activity.upgradeController')    ('upgradeController',     'pickupDroppedEnergy')
  },
  spawn: room => {
    if (!room.hasNeighboringSpawnConstructionSite() && !room.hasFlag(/^spawn builder spawn/)) {
      return;
    }
    return {
      body: { carry: 2, move: 3, work: 3 },
      mapAmount: 4
    };
  }
};
