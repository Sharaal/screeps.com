'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestSource')('find-storeStructure'),
      require('./creep.role-partial.store')()
    )
};
