'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestSource')        ('transferEnergyStorage', harvest),
    require('./creep.activity.transferEnergyStorage')('transferEnergyStorage', harvest)
  )
};
