'use strict';

module.exports = next => {
  return {
    'find-transferStructure': {
      run: require('./creep.activity.find-transferStructure'),
      next: creep => {
        if (creep.memory.transferStructure) {
          return 'transfer';
        }
        return next;
      }
    },
    transfer: {
      run: require('./creep.activity.transferStructure'),
      next: creep => {
        if (creep.carry.energy) {
          return 'find-transferStructure';
        }
        return 'harvestSource';
      }
    },
  };
};
