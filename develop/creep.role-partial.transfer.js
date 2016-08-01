'use strict';

module.exports = next => {
  return {
    'find-transferStructure': {
      do: require('./creep.activity.find-transferStructure'),
      next: creep => {
        if (creep.memory.transferStructure) {
          return 'move-to transferStructure';
        }
        return next;
      }
    },
    'move-to transferStructure': {
      do: require('./creep.activity.move-to'),
      next: 'transfer'
    },
    transfer: {
      do: require('./creep.activity.transfer'),
      next: creep => {
        if (creep.carry.energy) {
          creep.memory.target = 'roomController';
          return next;
        }
        return 'move-to source';
      }
    },
  }
};
