'use strict';

module.exports = {
  startActivity: 'find-energyStore',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestEnergyStore')('find-transferStructure'),
      require('./creep.role-partial.transfer')(undefined, 'find-energyStore')
    )
};
