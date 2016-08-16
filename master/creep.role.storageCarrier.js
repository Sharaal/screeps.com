'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestDroppedEnergy':   require('./creep.activity.harvestDroppedEnergy')  ('transferStructure',     'harvestEnergyContainer'),
    'harvestEnergyContainer': require('./creep.activity.harvestEnergyContainer')('transferStructure',     'harvestEnergyStorage'),
    'harvestEnergyStorage':   require('./creep.activity.harvestEnergyStorage')  ('transferStructure',     harvest),
    'transferStructure':      require('./creep.activity.transferStructure')     ('transferEnergyStorage', harvest),
    'transferEnergyStorage':  require('./creep.activity.transferEnergyStorage') ('transferStructure',     harvest)
  }
};
