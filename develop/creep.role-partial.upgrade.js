'use strict';

module.exports = {
  'target-roomController': {
    do: creep => {
      creep.memory.target = 'roomController';
    },
    next: 'move-to roomController'
  },
  'move-to roomController': {
    do: require('./creep.activity.move-to'),
    next: 'upgrade'
  },
  upgrade: {
    do: require('./creep.activity.upgrade'),
    next: 'move-to source'
  },
};
