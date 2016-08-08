'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  'harvestEnergyStorage-buildConstructionSite': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestEnergyStorage') ('buildConstructionSite', harvest),
      require('./creep.activity.buildConstructionSite')('buildConstructionSite', harvest)
    ),
    spawnConditions: room => room.find(FIND_CONSTRUCTION_SITES).length > 0
  }
};
