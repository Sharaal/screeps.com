'use strict';

module.exports = next => {
  return {
    'find-source': {
      run: require('./creep.activity.find-source'),
      next: 'harvest'
    },
    harvest: {
      run: require('./creep.activity.harvest'),
      next
    },
  }
};
