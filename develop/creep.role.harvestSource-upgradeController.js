'use strict';

var harvest = 'harvestSource';
module.exports = {
  'harvestSource-upgradeController': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestSource')    ('upgradeController', harvest),
      require('./creep.activity.upgradeController')('upgradeController', harvest)
    )
  }
};
