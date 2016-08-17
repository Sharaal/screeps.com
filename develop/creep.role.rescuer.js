'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestEnergyStorage':   require('./creep.activity.harvestEnergyStorage')  ('rescueController',  'harvestEnergyContainer'),
    'harvestEnergyContainer': require('./creep.activity.harvestEnergyContainer')('rescueController',  'harvestDroppedEnergy'),
    'harvestDroppedEnergy':   require('./creep.activity.harvestDroppedEnergy')  ('rescueController',  'harvestSource'),
    'harvestSource':          require('./creep.activity.harvestSource')         ('rescueController',  harvest),
    'rescueController':       require('./creep.activity.upgradeController')     ('transferStructure', harvest, { ticksToDowngrade: 3500 }),
    'transferStructure':      require('./creep.activity.transferStructure')     ('upgradeController', harvest),
    'upgradeController':      require('./creep.activity.upgradeController')     ('upgradeController', harvest)
  }
};
