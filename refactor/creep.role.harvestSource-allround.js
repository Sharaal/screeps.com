'use strict';

var harvest = 'harvestSource';
module.exports = {
  'harvestSource-allround': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestSource')('transferStructure', harvest),
      require('./creep.activity.transferStructure')('buildConstructionSite', harvest),
      require('./creep.activity.buildConstructionSite')('upgradeController', harvest),
      require('./creep.activity.upgradeController')('upgradeController', harvest)
    ),
    spawnConditions: room => room.find(FIND_SOURCES).length > 0
  }
};
