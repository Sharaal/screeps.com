'use strict';

var harvest = 'harvestSource';
module.exports = {
  'source-allrounder': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestSource')        ('transferStructure',     harvest),
      require('./creep.activity.transferStructure')    ('buildConstructionSite', harvest),
      require('./creep.activity.buildConstructionSite')('upgradeController',     harvest),
      require('./creep.activity.upgradeController')    ('upgradeController',     harvest)
    )
  }
};
