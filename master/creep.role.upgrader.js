'use strict';

module.exports.activities = {
  harvest: {
    do: require('./creep.activity.harvest'),
    next: 'upgrade'
  },
  upgrade: {
    do: require('./creep.activity.upgrade'),
    next: 'harvest'
  },
};

module.exports.spawn = {
  amount: 1,
  body: [WORK, CARRY, MOVE, MOVE]
};
