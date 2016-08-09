'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  'harvestEnergyStorage-upgradeController': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestEnergyStorage')('upgradeController', harvest),
      require('./creep.activity.upgradeController')   ('upgradeController', harvest)
    )
  }
};
