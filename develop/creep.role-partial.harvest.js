'use strict';

module.exports = next => {
  return {
    'find-source': {
      run: require('./creep.activity.find-source'),
      next: 'move-to source'
    },
    'move-to source': {
      run: require('./creep.activity.move-to'),
      next: 'harvest'
    },
    harvest: {
      run: require('./creep.activity.harvest'),
      next
    },
    'target-source': {
      run: require('./creep.activity.target-source'),
      next: 'move-to source'
    },
  }
};
