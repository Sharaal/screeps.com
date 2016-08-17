'use strict';

var empty = 'withdrawEnergyStorage';
module.exports = {
  startActivity: empty,
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',  'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',  'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',  'harvestSource'),
    'harvestSource':           require('./creep.activity.harvestSource')          ('rescueController',  empty),
    'rescueController':        require('./creep.activity.upgradeController')      ('transferStructure', empty, { ticksToDowngrade: 2500 }),
    'transferStructure':       require('./creep.activity.transferStructure')      ('upgradeController', empty),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController', empty)
  }
};
