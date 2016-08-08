'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestEnergyStorage') ('buildConstructionSite', harvest),
    require('./creep.activity.buildConstructionSite')('buildConstructionSite', harvest)
  ),
  conditions: room => room.find(FIND_CONSTRUCTION_SITES).length > 0
};
