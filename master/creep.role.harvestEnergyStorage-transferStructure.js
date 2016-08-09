'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  'harvestEnergyStorage-transferStructure': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestEnergyStorage')('transferStructure', harvest),
      require('./creep.activity.transferStructure')   ('transferStructure', harvest)
    )
  }
};
