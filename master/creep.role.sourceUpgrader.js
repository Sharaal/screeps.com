'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource':     require('./creep.activity.harvestSource')    ('upgradeController', harvest),
    'upgradeController': require('./creep.activity.upgradeController')('upgradeController', harvest)
  }
};
