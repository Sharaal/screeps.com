'use strict';

module.exports = {
  harvest: {
    do: require('./creep.activity.harvest'),
    next: 'upgrade'
  },
  upgrade: {
    do: require('./creep.activity.upgrade'),
    next: 'harvest'
  },
};
