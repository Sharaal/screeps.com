'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestEnergyStorage':  require('./creep.activity.harvestEnergyStorage')    ('buildConstructionSite', 'harvestEnergyContainer'),
    'harvestEnergyContainer':  require('./creep.activity.harvestEnergyContainer')('buildConstructionSite', harvest),
    'buildConstructionSite': require('./creep.activity.buildConstructionSite')   ('upgradeController',     harvest),
    'upgradeController':     require('./creep.activity.upgradeController')       ('upgradeController',     harvest)
  },
  roomConditions: room => room.find(FIND_MY_CONSTRUCTION_SITES).length > 0
};
