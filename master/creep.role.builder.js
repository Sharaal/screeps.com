'use strict';

module.exports.activities = {
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

module.exports.spawn = {
  amount: 5,
  body: [WORK, CARRY, MOVE, MOVE]
};
