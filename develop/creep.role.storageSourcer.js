'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource': require('./creep.activity.harvestSource')('dropEnergy', harvest),
    'dropEnergy':    require('./creep.activity.dropEnergy')   (harvest)
  }
};
