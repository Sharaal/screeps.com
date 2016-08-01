'use strict';

module.exports = next => {
  return {
    'find-transferStructure': {
      run: require('./creep.activity.find-transferStructure'),
      next: creep => {
        if (creep.memory.transferStructure) {
          return 'move-to transferStructure';
        }
        return next;
      }
    },
    'move-to transferStructure': {
      run: require('./creep.activity.move-to'),
      next: 'transfer'
    },
    transfer: {
      run: require('./creep.activity.transferStructure'),
      next: creep => {
        if (creep.carry.energy) {
          return 'find-transferStructure';
        }
        return 'target-source';
      }
    },
  }
};
