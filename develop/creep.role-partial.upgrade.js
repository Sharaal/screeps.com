'use strict';

module.exports = harvest => {
  return {
    upgrade: {
      run: require('./creep.activity.upgrade'),
        next: harvest || 'harvestSource'
    },
  };
};
