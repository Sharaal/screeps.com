'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestEnergyStorage':   require('./creep.activity.harvestEnergyStorage')  ('rescueController',      'harvestEnergyContainer'),
    'harvestEnergyContainer': require('./creep.activity.harvestEnergyContainer')('rescueController',      'harvestDroppedEnergy'),
    'harvestDroppedEnergy':   require('./creep.activity.harvestDroppedEnergy')  ('rescueController',      harvest),
    'rescueController':       require('./creep.activity.upgradeController')     ('buildConstructionSite', harvest, { ticksToDowngrade: 3500 }),
    'buildConstructionSite':  require('./creep.activity.buildConstructionSite') ('upgradeController',     harvest),
    'upgradeController':      require('./creep.activity.upgradeController')     ('upgradeController',     harvest)
  }
};
