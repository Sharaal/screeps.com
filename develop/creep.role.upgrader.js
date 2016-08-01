'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
    {},
    require('./creep.role-partial.harvest')('find-constructionSite'),
    require('./creep.role-partial.upgrade')
  )
};
