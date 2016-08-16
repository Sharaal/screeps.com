'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestEnergyStorage': require('./creep.activity.harvestEnergyStorage')('upgradeController', harvest),
    'upgradeController':    require('./creep.activity.upgradeController')   ('upgradeController', harvest)
  }
};
