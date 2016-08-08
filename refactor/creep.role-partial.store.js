'use strict';

module.exports = next => {
  return {
    'find-storeStructure': {
      run: require('./creep.activity.find-storeStructure'),
      next: creep => {
        if (creep.memory.storeStructure) {
          return 'store';
        }
        return next;
      }
    },
    store: {
      run: require('./creep.activity.transferEnergyStorage.js'),
      next: creep => {
        if (creep.carry.energy) {
          return 'find-storeStructure';
        }
        return 'harvestSource';
      }
    },
  };
};
