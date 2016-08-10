'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestSource':         require('./creep.activity.harvestSource')        ('transferStructure',     harvest),
    'transferStructure':     require('./creep.activity.transferStructure')    ('buildConstructionSite', harvest),
    'buildConstructionSite': require('./creep.activity.buildConstructionSite')('upgradeController',     harvest),
    'upgradeController':     require('./creep.activity.upgradeController')    ('upgradeController',     harvest)
  }
};
