'use strict';

var harvest = 'harvestDroppedEnergy';
module.exports = {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestDroppedEnergy') ('transferEnergyStorage', 'harvestEnergyStorage'),
      require('./creep.activity.transferEnergyStorage')('transferStructure',     harvest),
      require('./creep.activity.harvestEnergyStorage') ('transferStructure',     harvest),
    )
  }
};
