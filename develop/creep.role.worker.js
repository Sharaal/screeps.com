'use strict';

var needEnergy = 'withdrawEnergyStorage';
module.exports = {
  startActivity: needEnergy,
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',      'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',      'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',      needEnergy),
    'rescueController':        require('./creep.activity.upgradeController')      ('buildConstructionSite', needEnergy, { ticksToDowngrade: 3500 }),
    'buildConstructionSite':   require('./creep.activity.buildConstructionSite')  ('upgradeController',     needEnergy),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController',     needEnergy)
  }
};
