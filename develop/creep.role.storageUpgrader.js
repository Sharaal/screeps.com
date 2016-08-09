'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  'storageUpgrader': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestEnergyStorage')('upgradeController', harvest),
      require('./creep.activity.upgradeController')   ('upgradeController', harvest)
    )
  }
};
