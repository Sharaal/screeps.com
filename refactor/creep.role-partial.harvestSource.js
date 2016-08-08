'use strict';

module.exports = (next, fallback) => {
  return {
    'find-source': {
      run: require('./creep.activity.find-source'),
      next: 'harvestSource'
    },
    harvestSource: {
      run: require('./creep.activity.harvestSource'),
      next: creep => {
        if (creep.carry.energy === creep.carryCapacity) {
          return next;
        }
        return fallback;
      }
    },
  };
};
