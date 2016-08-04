'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestSource')('find-transferStructure', 'find-energyStore'),
      require('./creep.role-partial.harvestEnergyStore')('find-transferStructure', 'harvestSource'),
      require('./creep.role-partial.transfer')('find-constructionSite'),
      require('./creep.role-partial.build')('find-storeStructure'),
      require('./creep.role-partial.store')('upgrade'),
      require('./creep.role-partial.upgrade')
    )
};
