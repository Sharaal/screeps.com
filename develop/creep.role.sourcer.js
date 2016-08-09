'use strict';

var harvest = 'harvestSource';
module.exports = {
  'sourcer': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestSource')('dropEnergy', harvest),
      require('./creep.activity.dropEnergy')   (harvest)
    )
  }
};
