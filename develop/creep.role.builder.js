'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
  'builder': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestDroppedEnergy') ('buildConstructionSite', 'harvestEnergyStorage'),
      require('./creep.activity.harvestEnergyStorage') ('buildConstructionSite', harvest),
      require('./creep.activity.buildConstructionSite')('upgradeController',     harvest),
      require('./creep.activity.upgradeController')    ('upgradeController',     harvest)
    ),
    roomConditions: room => room.find(FIND_CONSTRUCTION_SITES).length > 0
  }
};
