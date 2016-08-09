'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
  'storageCarrier': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestDroppedEnergy') ('transferStructure',     'harvestEnergyStorage'),
      require('./creep.activity.transferEnergyStorage')('transferStructure',     harvest),
      require('./creep.activity.harvestEnergyStorage') ('transferStructure',     harvest),
      require('./creep.activity.transferStructure')    ('transferEnergyStorage', harvest)
    )
  }
};
