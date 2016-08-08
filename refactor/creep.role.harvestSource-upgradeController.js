'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestSource')    .activities('upgradeController', harvest),
    require('./creep.activity.upgradeController').activities('upgradeController', harvest)
  ),
  conditions: require('./creep.activity.harvestSource').conditions
};
