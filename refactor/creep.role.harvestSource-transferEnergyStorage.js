'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestSource')        .activities('transferEnergyStorage', harvest),
    require('./creep.activity.transferEnergyStorage').activities('transferEnergyStorage', harvest)
  )
};
