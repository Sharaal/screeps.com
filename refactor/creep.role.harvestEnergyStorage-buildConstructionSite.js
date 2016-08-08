'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestEnergyStorage') ('buildConstructionSite', harvest),
    require('./creep.activity.buildConstructionSite')('buildConstructionSite', harvest)
  )
};
