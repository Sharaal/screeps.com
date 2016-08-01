'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
    {},
    require('./creep.role-partial.harvest')('find-transferStructure'),
    require('./creep.role-partial.transfer')('find-constructionSite'),
    require('./creep.role-partial.build')('target-roomController'),
    require('./creep.role-partial.upgrade')
  )
};
