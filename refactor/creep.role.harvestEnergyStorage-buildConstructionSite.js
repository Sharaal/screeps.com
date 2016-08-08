'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestEnergyStorage') .activities('buildConstructionSite', harvest),
    require('./creep.activity.buildConstructionSite').activities('buildConstructionSite', harvest)
  ),
  conditions: require('./creep.activity.buildConstructionSite').conditions
};
