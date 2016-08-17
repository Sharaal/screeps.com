'use strict';

var empty = 'withdrawEnergyStorage';
module.exports = {
  startActivity: empty,
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('rescueController',      'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('rescueController',      'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('rescueController',      empty),
    'rescueController':        require('./creep.activity.upgradeController')      ('buildConstructionSite', empty, { ticksToDowngrade: 3500 }),
    'buildConstructionSite':   require('./creep.activity.buildConstructionSite')  ('upgradeController',     empty),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController',     empty)
  }
};
