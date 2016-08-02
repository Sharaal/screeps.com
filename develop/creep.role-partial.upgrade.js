'use strict';

module.exports = {
  upgrade: {
    run: require('./creep.activity.upgrade'),
    next: 'harvest'
  },
};
