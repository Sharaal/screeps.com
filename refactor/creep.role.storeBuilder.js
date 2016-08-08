'use strict';

module.exports = {
  startActivity: 'find-energyStore',
  activities: _.merge(
      {},
      require('./creep.role-partial.harvestEnergyStore')('find-constructionSite'),
      require('./creep.role-partial.build')(undefined, 'find-energyStore')
    )
};
