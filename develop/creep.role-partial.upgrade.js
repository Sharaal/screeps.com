'use strict';

module.exports = {
  'target-roomController': {
    run: require('./creep.activity.target-roomController'),
    next: 'move-to roomController'
  },
  'move-to roomController': {
    run: require('./creep.activity.move-to'),
    next: 'upgrade'
  },
  upgrade: {
    run: require('./creep.activity.upgrade'),
    next: 'target-source'
  },
};
