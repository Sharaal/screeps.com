'use strict';

var needEnergy = 'harvestSource';
module.exports = {
  startActivity: needEnergy,
  activities: {
    'harvestSource':           require('./creep.activity.harvestSource')          ('transferEnergyStorage',   needEnergy),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferEnergyContainer', needEnergy, { range: 3 }),
    'transferEnergyContainer': require('./creep.activity.transferEnergyContainer')('dropEnergy',              needEnergy, { range: 3 }),
    'dropEnergy':              require('./creep.activity.dropEnergy')             (needEnergy)
  }
};
