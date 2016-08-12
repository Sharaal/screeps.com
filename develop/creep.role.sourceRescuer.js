'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource':         require('./creep.activity.harvestSource')    ('rescueController',  harvest),
    'rescueController':      require('./creep.activity.upgradeController')('transferStructure', harvest, { ticksToDowngrade: 3500 }),
    'transferStructure':     require('./creep.activity.transferStructure')('upgradeController', harvest),
    'upgradeController':     require('./creep.activity.upgradeController')('upgradeController', harvest)
  }
};
