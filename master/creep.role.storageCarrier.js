'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestDroppedEnergy':  require('./creep.activity.harvestDroppedEnergy') ('transferStructure',     'harvestEnergyStorage'),
    'transferEnergyStorage': require('./creep.activity.transferEnergyStorage')('transferStructure',     harvest),
    'harvestEnergyStorage':  require('./creep.activity.harvestEnergyStorage') ('transferStructure',     harvest),
    'transferStructure':     require('./creep.activity.transferStructure')    ('transferEnergyStorage', harvest)
  }
};
