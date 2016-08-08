'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestEnergyStorage').activities('upgradeController', harvest),
    require('./creep.activity.upgradeController')   .activities('upgradeController', harvest)
  )
};
