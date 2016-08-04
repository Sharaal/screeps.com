'use strict';

module.exports = (next, fallback) => {
  return {
    'find-energyStore': {
      run: require('./creep.activity.find-energyStore'),
      next: creep => {
        if (creep.memory.energyStore) {
          return 'harvestEnergyStore';
        }
        return fallback;
      }
    },
    harvestEnergyStore: {
      run: require('./creep.activity.harvestEnergyStore'),
      next: creep => {
        if (creep.carry.energy === creep.carryCapacity) {
          return next;
        }
        return fallback;
      }
    },
  }
};
