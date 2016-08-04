'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestSource')('find-transferStructure'),
      require('./creep.role-partial.transfer')('find-constructionSite'),
      require('./creep.role-partial.build')('find-storeStructure'),
      require('./creep.role-partial.store')('upgrade'),
      require('./creep.role-partial.upgrade')
    )
};
