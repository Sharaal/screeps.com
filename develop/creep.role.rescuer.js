'use strict';

var needEnergy = 'withdrawEnergyStorage';
module.exports = {
  startActivity: needEnergy,
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',  'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',  'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',  'harvestSource'),
    'harvestSource':           require('./creep.activity.harvestSource')          ('rescueController',  needEnergy),
    'rescueController':        require('./creep.activity.upgradeController')      ('transferStructure', needEnergy, { ticksToDowngrade: 2500 }),
    'transferStructure':       require('./creep.activity.transferStructure')      ('upgradeController', needEnergy),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController', needEnergy)
  }
};
