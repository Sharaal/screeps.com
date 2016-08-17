'use strict';

var empty = 'harvestSource';
module.exports = {
  startActivity: empty,
  activities: {
    'harvestSource':           require('./creep.activity.harvestSource')          ('transferEnergyStorage',   empty),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferEnergyContainer', empty, { range: 3 }),
    'transferEnergyContainer': require('./creep.activity.transferEnergyContainer')('dropEnergy',              empty, { range: 3 }),
    'dropEnergy':              require('./creep.activity.dropEnergy')             (empty)
  }
};
