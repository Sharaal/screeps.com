'use strict';

module.exports.activities = {
  harvest: {
    do: require('./creep.activity.harvest'),
    next: 'transfer'
  },
  transfer: {
    do: require('./creep.activity.transfer'),
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
  amount: 2,
  body: [WORK, CARRY, MOVE, MOVE]
};
