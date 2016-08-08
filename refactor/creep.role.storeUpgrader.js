'use strict';

module.exports = {
  startActivity: 'find-energyStore',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestEnergyStore')('upgrade'),
      require('./creep.role-partial.upgrade')('find-energyStore')
    )
};
