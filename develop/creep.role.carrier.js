'use strict';

var needEnergy = 'pickupDroppedEnergy';
module.exports = {
  startActivity: needEnergy,
  activities: {
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('transferStructure',     'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('transferStructure',     'withdrawEnergyStorage'),
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('transferStructure',     needEnergy),
    'transferStructure':       require('./creep.activity.transferStructure')      ('transferEnergyStorage', needEnergy),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferStructure',     needEnergy)
  }
};
