'use strict';

var harvest = 'harvestSource';
module.exports = {
  'harvestSource-transferEnergyStorage': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestSource')        ('transferEnergyStorage', harvest),
      require('./creep.activity.transferEnergyStorage')('transferEnergyStorage', harvest)
    )
  }
};
