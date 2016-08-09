'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
  'upgrader': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestDroppedEnergy')('upgradeController', 'harvestEnergyStorage'),
      require('./creep.activity.harvestEnergyStorage')('upgradeController', harvest),
      require('./creep.activity.upgradeController')   ('upgradeController', harvest)
    )
  }
};
