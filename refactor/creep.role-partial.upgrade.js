'use strict';

module.exports = harvest => {
  return {
    upgrade: {
      run: require('./creep.activity.upgradeController'),
        next: harvest || 'harvestSource'
    },
  };
};
