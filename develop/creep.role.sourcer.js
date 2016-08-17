'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource':           require('./creep.activity.harvestSource')          ('transferEnergyStorage',   harvest),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferEnergyContainer', harvest, { range: 3 }),
    'transferEnergyContainer': require('./creep.activity.transferEnergyContainer')('dropEnergy',              harvest, { range: 3 }),
    'dropEnergy':              require('./creep.activity.dropEnergy')             (harvest)
  }
};
