'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource':         require('./creep.activity.harvestSource')        ('transferEnergyStorage', harvest),
    'transferEnergyStorage': require('./creep.activity.transferEnergyStorage')('dropEnergy',            harvest, { range: 3 }),
    'dropEnergy':            require('./creep.activity.dropEnergy')           (harvest)
  }
};
