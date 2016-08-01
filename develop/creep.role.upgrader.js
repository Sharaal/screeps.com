'use strict';

module.exports = {
  startActivity: 'find-source',
  activities: _.merge(
    {},
    require('./creep.role-partial.harvest')('target-roomController'),
    require('./creep.role-partial.upgrade')
  )
};
