'use strict';

var empty = 'pickupDroppedEnergy';
module.exports = {
  startActivity: empty,
  activities: {
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('transferStructure',     'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('transferStructure',     'withdrawEnergyStorage'),
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('transferStructure',     empty),
    'transferStructure':       require('./creep.activity.transferStructure')      ('transferEnergyStorage', empty),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferStructure',     empty)
  }
};
