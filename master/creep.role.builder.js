'use strict';

module.exports = {
  harvest: {
    do: require('./creep.activity.harvest'),
    next: 'build'
  },
  build: {
    do: require('./creep.activity.build'),
    next: creep => {
      if (creep.carry.energy) {
        return 'upgrade';
      }
      return 'harvest';
    }
  },
  upgrade: {
    do: require('./creep.activity.upgrade'),
    next: 'harvest'
  },
};
