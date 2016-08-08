'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestEnergyStorage').activities('transferStructure', harvest),
    require('./creep.activity.transferStructure')   .activities('transferStructure', harvest)
  )
};
